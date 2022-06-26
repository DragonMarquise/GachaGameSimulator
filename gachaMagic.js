// Note about Javascript: Functions in a script file are loaded in the order that they
// appear in the script. Hence, if say function2() calls on function1(), function1()
// has to be placed before function2() in the script, otherwise it will not work!

function updateTracker() {
  // Set the default values of the session variables at this point, if they
  // haven't already been set.
  if (sessionStorage.getItem("currency") == null) {
    sessionStorage.setItem("currency", 0);
  }

  if (sessionStorage.getItem("currencySpent") == null) {
    sessionStorage.setItem("currencySpent", 0);
  }

  if (sessionStorage.getItem("totalPulls") == null) {
    sessionStorage.setItem("totalPulls", 0);
  }

  // Used to determine if True Gacha Mode is enabled or disabled.
  if (sessionStorage.getItem("trueGacha") == null) {
    sessionStorage.setItem("trueGacha", "");
  }

  // Need to initialize the pullHistory string here as an empty string.
  // It will be filled with pull history later on.
  if (sessionStorage.getItem("pullHistory") == null) {
    sessionStorage.setItem("pullHistory", "");
  }

  // Special loop for the character counts. They're named after the icon spots they
  // would be in within the Gallery.
  // If the first one isn't already populated, then that means the others aren't as well.
  if (sessionStorage.getItem("iconDisplay1") == null) {
    var totalCharacters = platinumRank.length + goldRank.length + silverRank.length + bronzeRank.length + tinRank.length;
    var i = 1;
    while (i <= totalCharacters) {
      sessionStorage.setItem("iconDisplay" + i, 0);
      i++;
    }
  }

  // Keep the tracker up to date with the player's current currency and pulls.
  // Due to functionality in the rest of the code, these will cap out at
  // 999,999,999 and 9,999 respectively.
  document.getElementById("tracker").innerHTML = "--- Currency: " + sessionStorage.getItem("currency")
                                        + " --- Currency spent so far: " + sessionStorage.getItem("currencySpent")
                                        + " --- Total pulls so far: " + sessionStorage.getItem("totalPulls") + " ---";
}

function indexReset() {
  // Always reset the pagePulls value, since it represents the number of pulls while on a particular page.
  // It should reset when navigating away from a pull page.
  sessionStorage.setItem("pagesPulls", 0);

  updateTracker();
}

// Keep separate arrays for each rank. These are arrays of arrays (basically tuples) that hold
// info about a character's icon image, full image, and description.

const platinumRank = [
  ['Images_Icons/Icon_Eclipsia.png', 'Images_Full/Platinum_Eclipsia.png', 'Once upon a time, a sun goddess and moon god had a daughter. That daughter ate her parents and absorbed their powers. Thus she became Eclipsia, the Tyrant Queen of Space.', 1],
  ['Images_Icons/Icon_Warrior.png', 'Images_Full/Platinum_Warrior.png', 'A hero who has been forced to reincarnate again and again to fight back an immortal evil whenever needed. But now he want to find a way to stop the cycle for good...', 2],
  ['Images_Icons/Icon_Sandalphon.png', 'Images_Full/Platinum_Sandalphon.png', 'An alien angel from an alternate dimension, they escaped a war that killed countless lives, including gods. Now they stay in this reality to prevent the same war from happening here.', 3]
]

const goldRank = [
  ['Images_Icons/Icon_BuffMan.png', 'Images_Full/Gold_BuffMan.png', 'A big bodacious hero, he is here to stop crime wherever it is! Huzzah!', 4],
  ['Images_Icons/Icon_LadyLonglegs.png', 'Images_Full/Gold_LadyLonglegs.png', 'She travels the world defeating monsters with her mighty magic!', 5],
  ['Images_Icons/Icon_MxGunzakimbo.png', 'Images_Full/Gold_MxGunzakimbo.png', 'The best way to describe them is as a Chaotic Good mercenary who\'s fighting a corrupt military!', 6],
  ['Images_Icons/Icon_Butler.png', 'Images_Full/Gold_Butler.png', 'He is the best butler in the world, always at your service!', 7],
  ['Images_Icons/Icon_McGee.png', 'Images_Full/Gold_McGee.png', 'She made a real working version of her favorite video game weapon, and now she\'s off to save the world!', 8],
  ['Images_Icons/Icon_Timbly.png', 'Images_Full/Gold_Timbly.png', 'He\'s a jerk, but for some reason people love him anyways. And that suit isn\'t his, he\'s just renting it!', 9],
  ['Images_Icons/Icon_CLOWN.png', 'Images_Full/Gold_CLOWN.png', 'They\'re on a mission to either save humanity or destory it, but they forgot which it was supposed to be...', 10]
]

const silverRank = [
  ['Images_Icons/Icon_Smarty.png', 'Images_Full/Silver_Smarty.png', 'Their name ended up very appropriate to their abilities and hobbies. They work as an omni engineer!', 11],
  ['Images_Icons/Icon_Pomegranate.png', 'Images_Full/Silver_Pomegranate.png', 'She likes peppermint mocha coffee, but dislikes that it\'s only a seasonal flavor.', 12],
  ['Images_Icons/Icon_JaneDoe.png', 'Images_Full/Silver_JaneDoe.png', 'A simple lady who lives off the grid in the middle of the woods. Please don\'t ask about the shovel...', 13],
  ['Images_Icons/Icon_Hourglass.png', 'Images_Full/Silver_Hourglass.png', 'It\'s hard to find clothes that fit, but she thinks her figure is worth it.', 14],
  ['Images_Icons/Icon_Eustace.png', 'Images_Full/Silver_Eustace.png', 'He always blames his misfortunes on "that stupid dog", but it\'s really his own fault.', 15],
  ['Images_Icons/Icon_Dude.png', 'Images_Full/Silver_Dude.png', 'It\'s dangerous to underestimate The Dude.', 16],
  ['Images_Icons/Icon_CoolerDude.png', 'Images_Full/Silver_CoolerDude.png', 'May or may not be related to The Dude. Or maybe is The Dude in disguise. Who knows!', 17],
  ['Images_Icons/Icon_Alien.png', 'Images_Full/Silver_Alien.png', 'Definitely not an alien, no sir! Just an ordinary tourist from Virginia, nothing to see here.', 18],
  ['Images_Icons/Icon_FahrenCelsi.png', 'Images_Full/Silver_FahrenCelsi.png', 'Twin spirits of temperature, Fahren controls heat and Celsi controls cold.', 19],
  ['Images_Icons/Icon_Glitch.png', 'Images_Full/Silver_Glitch.png', 'ERROR 404', 20],
  ['Images_Icons/Icon_Linguine.png', 'Images_Full/Silver_Linguine.png', 'It likes pasta, moonlit nights, and scaring off trespassers on its territory.', 21],
  ['Images_Icons/Icon_Skate.png', 'Images_Full/Silver_Skate.png', 'An extremely cool man, he\'s a pro skater by day and a skate-themed phantom thief by night.', 22]
]

const bronzeRank = [
  ['Images_Icons/Icon_Guy.png', 'Images_Full/Bronze_Guy.png', 'Just a guy trying to make it big in this crazy world.', 23],
  ['Images_Icons/Icon_Gal.png', 'Images_Full/Bronze_Gal.png', 'Just a gal trying to survive in this wild world.', 24],
  ['Images_Icons/Icon_Pal.png', 'Images_Full/Bronze_Pal.png', 'Just a pal here to see what life has to offer.', 25],
  ['Images_Icons/Icon_Creature.png', 'Images_Full/Bronze_Creature.png', 'Just a simple creature, nothing to see here, I promise...', 26],
  ['Images_Icons/Icon_Pencil.png', 'Images_Full/Bronze_Pencil.png', 'Ironically, they hate writing by hand, preferring to type instead.', 27],
  ['Images_Icons/Icon_Cardboard.png', 'Images_Full/Bronze_Cardboard.png', 'He thinks he\'s a knight in armor, but that cardboard doesn\'t offer much protection.', 28],
  ['Images_Icons/Icon_Floral.png', 'Images_Full/Bronze_Floral.png', 'One evil flower is bad enough, but three in one is even worse. Watch your fingers.', 29],
  ['Images_Icons/Icon_Paperclip.png', 'Images_Full/Bronze_Paperclip.png', 'A malevolent spirit possessed a paperclip, and it now terrorizes offices everywhere...', 30],
  ['Images_Icons/Icon_Squirrel.png', 'Images_Full/Bronze_Squirrel.png', 'It steals food from picnikcers, and is especially fond of stealing candy from children.', 31]
]

const tinRank = [
  ['Images_Icons/Icon_Animal.png', 'Images_Full/Tin_Animal.png', 'It has no monetary value, but its nostalgic value more than makes up for it.', 32],
  ['Images_Icons/Icon_Cards.png', 'Images_Full/Tin_Cards.png', 'Essentially a pile of proto-NFTs, someone payed a lot to get these but got little return on them.', 33],
  ['Images_Icons/Icon_Empty.png', 'Images_Full/Tin_Empty.png', 'There was a character in here, but someone else already opened it. Was it a rare character? You\'ll never know now!', 34],
  ['Images_Icons/Icon_Pillow.png', 'Images_Full/Tin_Pillow.png', 'Normally people put a cover on these to represent a character. Since this one doesn\'t have a cover, it\'s just an unimportant pillow.', 35],
  ['Images_Icons/Icon_Recycle.png', 'Images_Full/Tin_Recycle.png', 'You could get a couple of dollars at most for recylcing these, but as is they\'re not very useful.', 36]
]

function updateCharacterCount(input) {
  var countValue = parseInt(sessionStorage.getItem("iconDisplay" + input));
  countValue += 1;

  // Cap the character counts at 999999999
  if (countValue > 999999999)
  {
    sessionStorage.setItem("iconDisplay" + input, 999999999);
  } else {
    sessionStorage.setItem("iconDisplay" + input, countValue);
  }
}

function updatePagePulls() {
  var countValue = parseInt(sessionStorage.getItem("pagesPulls"));
  countValue += 1;

  // Cap the page pull counts at 999999999
  if (countValue > 999999999)
  {
    sessionStorage.setItem("pagesPulls", 999999999);
  } else {
    sessionStorage.setItem("pagesPulls", countValue);
  }

  document.getElementById("pageTracker").innerHTML = "Pulls so far while on this page: " + sessionStorage.getItem("pagesPulls");
}

function convertPullHistory() {
  // This is for converting the pullHistory storage variable into a useable array format.
  // Start with getting the pull history from the sessionStorage, and then splitting it into an array.
  var pullHistoryString = sessionStorage.getItem("pullHistory");
  historyArray = pullHistoryString.split(":");

  // This next split will then effectively split the array into an array of arrays. The array holds pull values,
  // which in turn are stored as inner arrays.
  i = 0;
  while (i < historyArray.length){
    historyArray[i] = historyArray[i].split(".");
    i++;
  }

  // Now return the history array so that it can be used by whichever function called on this one.
  return historyArray;
}

function savePullHistory(arrayInput) {
  // This is for saving a pullHistory array into the pullHistory storage variable.
  pullhistoryString = "";

  i = 0;
  while (i < arrayInput.length){
  	if (arrayInput[i].length == 1) {
    	pullhistoryString += arrayInput[i][0] + ":";
    } else {
    	j = 0

      // If a pull has more than one value, need to have special characters to split up the values.
      while (j < arrayInput[i].length) {
      	pullhistoryString += arrayInput[i][j];
        j++;

        // Use periods to separate values in a pull, and colons to separate pulls.
        if (j < arrayInput[i].length) {
        	pullhistoryString += ".";
        } else {
        	pullhistoryString += ":";
        }
      }
    }

    i++;
  }

  // Remove the last extra : character from the string before storing it.
  pullhistoryString = pullhistoryString.slice(0, -1);

  sessionStorage.setItem("pullHistory", pullhistoryString);
}

function updatePullHistory(arrayInput) {
  currentHistory = [];

  // If the current history is already populated, use convertPullHistory() to get an array
  // based on the saved data.
  if (sessionStorage.getItem("pullHistory") != "") {
    currentHistory = convertPullHistory();
  }

  // Add the new pull to the pull history. If the current list of pulls is greater than 50,
  // use shift() to remove the oldest
  currentHistory.push(arrayInput);
  if (currentHistory.length > 50) {
    currentHistory.shift();
  }

  savePullHistory(currentHistory);
}

function updateTrueGachaButton() {
  // Using !! here converts strings to boolean. If the string is empty (i.e. ""), then the Boolean value is false.
  // If it's a non-empty string, the Boolean value will be true.
  // This is really just so we don't have to deal with converting strings to boolean and back.
  if (!!sessionStorage.getItem("trueGacha")) {
    sessionStorage.setItem("trueGacha", "");
    document.getElementById("trueGachaButton").innerHTML = "True Gacha Mode: Off";
  }
  else {
    sessionStorage.setItem("trueGacha", "true");
    document.getElementById("trueGachaButton").innerHTML = "True Gacha Mode: On";
  }
}

function setTrueGachaButton() {
  // This is for setting the button's text in-between reloads of the index page, to make sure the button
  // test is accurate without changing the actual trueGacha value.
  if (!!sessionStorage.getItem("trueGacha")) {
    document.getElementById("trueGachaButton").innerHTML = "True Gacha Mode: On";
  }
  else {
    document.getElementById("trueGachaButton").innerHTML = "True Gacha Mode: Off";
  }
}

function retrieveTrueGacha() {
  // Same reasoning for use of !! here as noted in updateTrueGachaButton()
  currentTrueGacha = !!sessionStorage.getItem("trueGacha");

  return currentTrueGacha;
}

function generateRatesString() {
  // Generates the string for pull rates based on whether or not True Gacha Mode is enabled.
  trueGachaMode = retrieveTrueGacha();

  if (trueGachaMode)
  {
    // Set the string with the True Gacha Mode rates
    document.getElementById("ratesString").innerHTML = "Probabilities: <br> ---Platinum Rank characters = 0.3%" +
                      "<br> ---Gold Rank characters = 0.7% <br> ---Silver Rank characters = 9%" +
                      "<br> ---Bronze Rank characters = 15% <br> ---Tin Rank characters = 75%";
  } else {
    // Set the string with the normal rates
    document.getElementById("ratesString").innerHTML = "Probabilities: <br> ---Platinum Rank characters = 5%" +
                      "<br> ---Gold Rank characters = 10% <br> ---Silver Rank characters = 15%" +
                      "<br> ---Bronze Rank characters = 20% <br> ---Tin Rank characters = 50%";
  }
}

function generateRatesString_Gold(characterName) {
  // Specifically for the Gold Rank character banners, with a given character's name as input.
  trueGachaMode = retrieveTrueGacha();

  if (trueGachaMode)
  {
    // Set the string with the True Gacha Mode rates
    document.getElementById("ratesString").innerHTML = "Probabilities: <br> ---" + characterName + " = 0.4% <br> ---Platinum Rank Characters = 0.3%" +
                      "<br> ---Other Gold Rank characters = 0.3% <br> ---Silver Rank characters = 9%" +
                      "<br> ---Bronze Rank characters = 15% <br> ---Tin Rank characters = 75%";
  } else {
    // Set the string with the normal rates
    document.getElementById("ratesString").innerHTML = "Probabilities: <br> ---" + characterName + " = 7% <br> ---Platinum Rank Characters = 5%" +
                      "<br> ---Other Gold Rank characters = 3% <br> ---Silver Rank characters = 15%" +
                      "<br> ---Bronze Rank characters = 20% <br> ---Tin Rank characters = 50%";
  }
}

function generateRatesString_Platinum(characterName) {
  // Specifically for the Platinum Rank character banners, with a given character's name as input.
  trueGachaMode = retrieveTrueGacha();

  if (trueGachaMode)
  {
    // Set the string with the True Gacha Mode rates
    document.getElementById("ratesString").innerHTML = "Probabilities: <br> ---" + characterName + " = 0.2% <br> ---Other Platinum Rank characters = 0.1%" +
                      "<br> ---Gold Rank characters = 0.7% <br> ---Silver Rank characters = 9%" +
                      "<br> ---Bronze Rank characters = 15% <br> ---Tin Rank character = 75%";
  } else {
    // Set the string with the normal rates
    document.getElementById("ratesString").innerHTML = "Probabilities: <br> ---" + characterName + " = 3% <br> ---Other Platinum Rank characters = 2%" +
                      "<br> ---Gold Rank characters = 10% <br> ---Silver Rank characters = 15%" +
                      "<br> ---Bronze Rank characters = 20% <br> ---Tin Rank character = 50%";
  }
}

function newPull_Single() {
  // The Math.random() method basically returns a value between 0 and 1
  // (0.25, 0.37, etc.); the range includes 0 but excludes 1.

  // Also, use an array to keep track of the character per pull.
  var pullEntry = [];

  if (parseInt(sessionStorage.getItem("currency")) < 10) {
    // Only do a pull if the user has enough currency.
    document.getElementById("pullButton").innerHTML = "You need more currency!!";
    resetOnPull();
  } else {
    // Check the True Gacha Mode to see what rates to use.
    platinumRate = 0;
    goldRate = 0;
    silverRate = 0;
    bronzeRate = 0;

    if (retrieveTrueGacha()){
      platinumRate = 998;
      goldRate = 991;
      silverRate = 901;
      bronzeRate = 751;
    } else {
      platinumRate = 950;
      goldRate = 850;
      silverRate = 700;
      bronzeRate = 500;
    }

    // The following returns a random number between 1 and 1000.
    var randomNumber = Math.floor((Math.random() * 1000) + 1);

    if (randomNumber >= platinumRate) {
      // Get a random character from the Platinum Rank array.
      randomIcon = Math.floor(Math.random() * platinumRank.length);
      document.getElementById("iconDisplay").src = platinumRank[randomIcon][0];
      document.getElementById("fullDisplay").src = platinumRank[randomIcon][1];
      document.getElementById("descriptionSelect").innerHTML = platinumRank[randomIcon][2];

      updateCharacterCount(platinumRank[randomIcon][3]);
      pullEntry.push(platinumRank[randomIcon][3]);
    } else if (randomNumber >= goldRate) {
      // Get a random character from the Gold Rank array.
      randomIcon = Math.floor(Math.random() * goldRank.length);
      document.getElementById("iconDisplay").src = goldRank[randomIcon][0];
      document.getElementById("fullDisplay").src = goldRank[randomIcon][1];
      document.getElementById("descriptionSelect").innerHTML = goldRank[randomIcon][2];

      updateCharacterCount(goldRank[randomIcon][3]);
      pullEntry.push(goldRank[randomIcon][3]);
    } else if (randomNumber >= silverRate) {
      // Get a random icon from the Silver Rank array.
      randomIcon = Math.floor(Math.random() * silverRank.length);
      document.getElementById("iconDisplay").src = silverRank[randomIcon][0];
      document.getElementById("fullDisplay").src = silverRank[randomIcon][1];
      document.getElementById("descriptionSelect").innerHTML = silverRank[randomIcon][2];

      updateCharacterCount(silverRank[randomIcon][3]);
      pullEntry.push(silverRank[randomIcon][3]);
    } else if (randomNumber >= bronzeRate) {
      // Get a random icon from the Bronze Rank array.
      randomIcon = Math.floor(Math.random() * bronzeRank.length);
      document.getElementById("iconDisplay").src = bronzeRank[randomIcon][0];
      document.getElementById("fullDisplay").src = bronzeRank[randomIcon][1];
      document.getElementById("descriptionSelect").innerHTML = bronzeRank[randomIcon][2];

      updateCharacterCount(bronzeRank[randomIcon][3]);
      pullEntry.push(bronzeRank[randomIcon][3]);
    } else {
      // Get a random icon from the Tin Rank array.
      randomIcon = Math.floor(Math.random() * tinRank.length);
      document.getElementById("iconDisplay").src = tinRank[randomIcon][0];
      document.getElementById("fullDisplay").src = tinRank[randomIcon][1];
      document.getElementById("descriptionSelect").innerHTML = tinRank[randomIcon][2];

      updateCharacterCount(tinRank[randomIcon][3]);
      pullEntry.push(tinRank[randomIcon][3]);
    }

    updateSessionVariables(5); // Update the tracker variables with the new pull.
    updatePagePulls();
    updatePullHistory(pullEntry);
  }
}

function silverBronzeAndTinRank(input, i) {
  // Check the True Gacha Mode to see what rates to use.
  silverRate = 0;
  bronzeRate = 0;

  if (retrieveTrueGacha()){
    silverRate = 901;
    bronzeRate = 751;
  } else {
    silverRate = 700;
    bronzeRate = 500;
  }

  // To reduce repetitive code, handle the calculations for silver, bronze, and tin rank
  // for multi-pulls here.
  if (input >= silverRate) {
    // Get a random icon from the Silver Rank array.
    randomIcon = Math.floor(Math.random() * silverRank.length);
    document.getElementById("iconDisplay" + i).src = silverRank[randomIcon][0];
    document.getElementById("iconDisplay" + i).longdesc = silverRank[randomIcon][1];
    document.getElementById("iconDisplay" + i).alt = silverRank[randomIcon][2];

    return silverRank[randomIcon][3];
  } else if (input >= bronzeRate) {
    // Get a random icon from the Bronze Rank array.
    randomIcon = Math.floor(Math.random() * bronzeRank.length);
    document.getElementById("iconDisplay" + i).src = bronzeRank[randomIcon][0];
    document.getElementById("iconDisplay" + i).longdesc = bronzeRank[randomIcon][1];
    document.getElementById("iconDisplay" + i).alt = bronzeRank[randomIcon][2];

    return bronzeRank[randomIcon][3];
  } else {
    // Get a random icon from the Tin Rank array.
    randomIcon = Math.floor(Math.random() * tinRank.length);
    document.getElementById("iconDisplay" + i).src = tinRank[randomIcon][0];
    document.getElementById("iconDisplay" + i).longdesc = tinRank[randomIcon][1];
    document.getElementById("iconDisplay" + i).alt = tinRank[randomIcon][2];

    return tinRank[randomIcon][3];
  }
}

function resetOnPull() {
  // Reset the full display and description for each pull in a multi-pull.
  document.getElementById("fullDisplay").src = "Images_Icons/Icon_Placeholder.png";
  document.getElementById("descriptionSelect").innerHTML = "A description about the selected character will appear here.";
}

function bannerGoldRank(input, i) {
  // Handles the iconDisplay changes for a specific character from the goldRank array.
  // This function is meant mainly for the banner pages, but also used for the multi-pulls.
  // In the latter case, the input is a random number rather than a specific number.
  document.getElementById("iconDisplay" + i).src = goldRank[input][0];
  document.getElementById("iconDisplay" + i).longdesc = goldRank[input][1];
  document.getElementById("iconDisplay" + i).alt = goldRank[input][2];

  return goldRank[input][3];
}

function bannerPlatinumRank(input, i) {
  // Similar to the bannerGoldRank() function, except this is using the platinumRank array.
  document.getElementById("iconDisplay" + i).src = platinumRank[input][0];
  document.getElementById("iconDisplay" + i).longdesc = platinumRank[input][1];
  document.getElementById("iconDisplay" + i).alt = platinumRank[input][2];

  return platinumRank[input][3];
}

function newPull_Multi(pullNumber, price) {
  // A sort of extension of the single pull function, in this case mainly needed
  // to handle multiple characters at once.

  if (parseInt(sessionStorage.getItem("currency")) < 50) {
    // Only do a pull if the user has enough currency.
    document.getElementById("pullButton").innerHTML = "You need more currency!!";
    resetOnPull();
  } else {
    // Check the True Gacha Mode to see what rates to use.
    platinumRate = 0;
    goldRate = 0;

    if (retrieveTrueGacha()){
      platinumRate = 998;
      goldRate = 991;
    } else {
      platinumRate = 950;
      goldRate = 850;
    }

    var randomNumber;
    let i = 1; // Have to start at 1 due to how the img id is set on the page.

    // Use an array to keep track of the character per pull.
    var pullEntry = [];
    characterValue = 0;

    // Make use of variable i to populate all of the iconDisplays in the 10+1 pull page.
    while (i < pullNumber) {
      // Set the random number in the while-loop, so it can be different on each loop.
      randomNumber = Math.floor((Math.random() * 1000) + 1);

      if (randomNumber >= platinumRate) {
        // Get a random character from the Platinum Rank array.
        randomIcon = Math.floor(Math.random() * platinumRank.length);

        characterValue = bannerPlatinumRank(randomIcon, i);
        updateCharacterCount(characterValue);
        pullEntry.push(characterValue);
      } else if (randomNumber >= goldRate) {
        // Gold rank chance is 10%
        // Get a random character from the Gold Rank array.
        randomIcon = Math.floor(Math.random() * goldRank.length);

        characterValue = bannerGoldRank(randomIcon, i);
        updateCharacterCount(characterValue);
        pullEntry.push(characterValue);
      } else {
        characterValue = silverBronzeAndTinRank(randomNumber, i);
        updateCharacterCount(characterValue);
        pullEntry.push(characterValue);
      }

      i++;
    }

    resetOnPull();
    updateSessionVariables(price); // Update the tracker variables with the new pull.
    updatePagePulls();
    updatePullHistory(pullEntry);
  }
}

function specialPullMessages(obtained, characterName) {
  // Handle the character messages for each special pull.
  if (obtained) {
    document.getElementById("bannerMessage").innerHTML = "Congradulations, you got " + characterName + "!!";
  } else {
    document.getElementById("bannerMessage").innerHTML = "Sorry, try again...";
  }
}

function reducedGoldRank(input, i) {
  // A special function for handling the banner pulls, for the Gold rank characters
  // that will have a reduced chance due to the banner being for one specific Gold character.
  // The input represents the position of the banner character in the goldRank array, and thus
  // the one part of the array that should be ignored here.
  tempArray = [];

  for (var x = 0; x < goldRank.length; x++) {
    if (x != input) {
      tempArray.push(x);
    }
  }

  randomIcon = tempArray[Math.floor(Math.random() * tempArray.length)];
  document.getElementById("iconDisplay" + i).src = goldRank[randomIcon][0];
  document.getElementById("iconDisplay" + i).longdesc = goldRank[randomIcon][1];
  document.getElementById("iconDisplay" + i).alt = goldRank[randomIcon][2];

  return goldRank[randomIcon][3];
}

function newSpecialPull_Gold(input, characterName) {
  // A function for the Gold rank special banner pulls, acts as a variant of the 10+1 pulls.
  // "input" is the character's position in the goldRank array, and "characterName" is just their name.

  if (parseInt(sessionStorage.getItem("currency")) < 75) {
    // Only do a pull if the user has enough currency.
    document.getElementById("pullButton").innerHTML = "You need more currency!!";
    resetOnPull();
  } else {
    // Check the True Gacha Mode to see what rates to use.
    goldRate = 0;
    reducedGoldRate = 0;
    platinumRate = 0;

    if (retrieveTrueGacha()){
      goldRate = 997;
      reducedGoldRate = 994;
      platinumRate = 991;
    } else {
      goldRate = 930;
      reducedGoldRate = 900;
      platinumRate = 850;
    }

    var randomNumber;
    let i = 1; // Have to start at 1 due to how the img id is set on the page.
    let obtained = false;

    // Use an array to keep track of the character per pull.
    var pullEntry = [];
    characterValue = 0;

    // Make use of variable i to populate all of the iconDisplays in the 10+1 pull page.
    while (i < 12) {
      // Set the random number in the while-loop, so it can be different on each loop.
      randomNumber = Math.floor((Math.random() * 1000) + 1);

      if (randomNumber >= goldRate) {
        // Improved rate for the banner character specifically.
        characterValue = bannerGoldRank(input, i);
        updateCharacterCount(characterValue);
        pullEntry.push(characterValue);

        obtained = true;
      } else if (randomNumber >= reducedGoldRate) {
        // Chance for the rest of the Gold rank characters is reduced.
        characterValue = reducedGoldRank(input, i);
        updateCharacterCount(characterValue);
        pullEntry.push(characterValue);
      } else if (randomNumber >= platinumRate) {
        // Platinum character rates stay the same.
        characterValue = bannerPlatinumRank(Math.floor(Math.random() * platinumRank.length), i);
        updateCharacterCount(characterValue);
        pullEntry.push(characterValue);
      } else {
        characterValue = silverBronzeAndTinRank(randomNumber, i);
        updateCharacterCount(characterValue);
        pullEntry.push(characterValue);
      }

      i++;
    }

    specialPullMessages(obtained, characterName);
    resetOnPull();
    updateSessionVariables(75); // Update the tracker variables with the new pull.
    updatePagePulls();
    updatePullHistory(pullEntry);
  }
}

function reducedPlatinumRank(input, i) {
  // Similar to the function used for reduced Gold rank chances, with this one beginning
  // for the Platinum rank instead.
  tempArray = [];

  for (var x = 0; x < platinumRank.length; x++) {
    if (x != input) {
      tempArray.push(x);
    }
  }

  randomIcon = tempArray[Math.floor(Math.random() * tempArray.length)];
  document.getElementById("iconDisplay" + i).src = platinumRank[randomIcon][0];
  document.getElementById("iconDisplay" + i).longdesc = platinumRank[randomIcon][1];
  document.getElementById("iconDisplay" + i).alt = platinumRank[randomIcon][2];

  return platinumRank[randomIcon][3];
}

function newSpecialPull_Platinum(input, characterName) {
  // A function for the Platinum rank special banner pulls, acts as a variant of the 10+1 pulls.
  // "input" is the character's position in the platinumRank array, and "characterName" is just their name.

  if (parseInt(sessionStorage.getItem("currency")) < 100) {
    // Only do a pull if the user has enough currency.
    document.getElementById("pullButton").innerHTML = "You need more currency!!";
    resetOnPull();
  } else {
    // Check the True Gacha Mode to see what rates to use.
    platinumRate = 0;
    reducedPlatinumRate = 0;
    goldRate = 0;

    if (retrieveTrueGacha()){
      platinumRate = 999;
      reducedPlatinumRate = 998;
      goldRate = 991;
    } else {
      platinumRate = 970;
      reducedPlatinumRate = 950;
      goldRate = 850;
    }

    var randomNumber;
    let i = 1; // Have to start at 1 due to how the img id is set on the page.
    let obtained = false;

    // Use an array to keep track of the character per pull.
    var pullEntry = [];
    characterValue = 0;

    // Make use of variable i to populate all of the iconDisplays in the 10+1 pull page.
    while (i < 12) {
      // Set the random number in the while-loop, so it can be different on each loop.
      randomNumber = Math.floor((Math.random() * 1000) + 1);

      if (randomNumber >= platinumRate) {
        // Improved rate for the banner character specifically.
        characterValue = bannerPlatinumRank(input, i);
        updateCharacterCount(characterValue);
        pullEntry.push(characterValue);

        obtained = true;
      } else if (randomNumber >= reducedPlatinumRate) {
        // Chance for the rest of the Platinum rank characters is reduced.
        characterValue = reducedPlatinumRank(input, i);
        updateCharacterCount(characterValue);
        pullEntry.push(characterValue);
      } else if (randomNumber >= goldRate) {
        // Gold character rates stay the same.
        characterValue = bannerGoldRank(Math.floor(Math.random() * goldRank.length), i);
        updateCharacterCount(characterValue);
        pullEntry.push(characterValue);
      } else {
        characterValue = silverBronzeAndTinRank(randomNumber, i);
        updateCharacterCount(characterValue);
        pullEntry.push(characterValue);
      }

      i++;
    }

    specialPullMessages(obtained, characterName);
    resetOnPull();
    updateSessionVariables(100); // Update the tracker variables with the new pull.
    updatePagePulls();
    updatePullHistory(pullEntry);
  }
}

function newSpecialPull_Buff() {
  // Increased chance for Buff Man in particular.
  newSpecialPull_Gold(0, "Buff Man");
}

function newSpecialPull_Lady() {
  // Increased chance for Lady Longlegs in particular.
  newSpecialPull_Gold(1, "Lady Longlegs");
}

function newSpecialPull_Gunz() {
  // Increased chance for Mx. Gunzakimbo in particular.
  newSpecialPull_Gold(2, "Mx. Gunzakimbo");
}

function newSpecialPull_Butler() {
  // Increased chance for The Handsomest Butler in particular.
  newSpecialPull_Gold(3, "The Handsomest Butler");
}

function newSpecialPull_McGee() {
  // Increased chance for Megan McGee in particular.
  newSpecialPull_Gold(4, "Megan McGee");
}

function newSpecialPull_Timbly() {
  // Increased chance for Timbly Sexymann in particular.
  newSpecialPull_Gold(5, "Timbly Sexymann");
}

function newSpecialPull_CLOWN() {
  // Increased chance for CHAOSCLOWN in particular.
  newSpecialPull_Gold(6, "CHAOSCLOWN");
}

function newSpecialPull_Eclipsia() {
  // Increased chance for Eclipsia in particular.
  newSpecialPull_Platinum(0, "Eclipsia");
}

function newSpecialPull_Warrior() {
  // Increased chance for The Lone Warrior in particular.
  newSpecialPull_Platinum(1, "The Lone Warrior");
}

function newSpecialPull_Sandalphon() {
  // Increased chance for Sandalphon Arpeggio in particular.
  newSpecialPull_Platinum(2, "Sandalphon Arpeggio");
}

function displayFullImage(input) {
  // When an icon is clicked, display the corresponding full image.
  // This is why the full image name is stored in the icon's longdesc attribute.

  // A failsafe in case the user clicks on an icon while it is displaying a placeholder.
  if (!document.getElementById(input).src.match("Images_Icons/Icon_Placeholder.png")) {
    document.getElementById("fullDisplay").src = document.getElementById(input).longdesc;
    document.getElementById("descriptionSelect").innerHTML = document.getElementById(input).alt;
  }
}

function loadingGallery() {
  // So i will represent the total number of icon displayed in the gallery, while j is limited
  // to the length of each array, and is reset between arrays as a result.
  let i = 1;
  let j = 0;

  while (j < platinumRank.length){
    document.getElementById("iconDisplay" + i).src = platinumRank[j][0];
    document.getElementById("iconDisplay" + i).longdesc = platinumRank[j][1];
    document.getElementById("iconDisplay" + i).alt = "Number of copies obtained: "
                                                      + parseInt(sessionStorage.getItem("iconDisplay" + i))
                                                      + "<br>" + platinumRank[j][2];

    i++;
    j++;
  }

  j = 0;

  while (j < goldRank.length){
    document.getElementById("iconDisplay" + i).src = goldRank[j][0];
    document.getElementById("iconDisplay" + i).longdesc = goldRank[j][1];
    document.getElementById("iconDisplay" + i).alt = "Number of copies obtained: "
                                                      + parseInt(sessionStorage.getItem("iconDisplay" + i))
                                                      + "<br>" + goldRank[j][2];

    i++;
    j++;
  }

  j = 0;

  while (j < silverRank.length){
    document.getElementById("iconDisplay" + i).src = silverRank[j][0];
    document.getElementById("iconDisplay" + i).longdesc = silverRank[j][1];
    document.getElementById("iconDisplay" + i).alt = "Number of copies obtained: "
                                                      + parseInt(sessionStorage.getItem("iconDisplay" + i))
                                                      + "<br>" + silverRank[j][2];

    i++;
    j++;
  }

  j = 0;

  while (j < bronzeRank.length){
    document.getElementById("iconDisplay" + i).src = bronzeRank[j][0];
    document.getElementById("iconDisplay" + i).longdesc = bronzeRank[j][1];
    document.getElementById("iconDisplay" + i).alt = "Number of copies obtained: "
                                                      + parseInt(sessionStorage.getItem("iconDisplay" + i))
                                                      + "<br>" + bronzeRank[j][2];

    i++;
    j++;
  }

  j = 0;

  while (j < tinRank.length){
    document.getElementById("iconDisplay" + i).src = tinRank[j][0];
    document.getElementById("iconDisplay" + i).longdesc = tinRank[j][1];
    document.getElementById("iconDisplay" + i).alt = "Number of copies obtained: "
                                                      + parseInt(sessionStorage.getItem("iconDisplay" + i))
                                                      + "<br>" + tinRank[j][2];

    i++;
    j++;
  }
}

function currencyGenerator() {
  // Increase the player's currency by a random amount. Note that anything stored in sessionStorage
  // comes out as a string, so the currency value needs to be converted into an int.
  var value = parseInt(sessionStorage.getItem("currency"));
  var randomNumber = Math.floor((Math.random() * 100) + 50);
  value += randomNumber;

  // Keep the currency capped out at a certain amount.
  if (value > 999999999)
  {
    sessionStorage.setItem("currency", 999999999);
    document.getElementById("amount").innerHTML = "Sorry, you're already maxed out on currency!";
  } else {
    sessionStorage.setItem("currency", value);
    document.getElementById("amount").innerHTML = "You got " + randomNumber + " amount of currency!";
  }

  // Make sure to call on the updateTracker() function to update with the new amount.
  updateTracker();
}

function updateSessionVariables(input) {
  // Update the currency and totalPulls session variables.
  var currencyValue = parseInt(sessionStorage.getItem("currency"));
  currencyValue -= input;

  // Make sure the currency amount can't go into the negatives.
  if (currencyValue < 0)
  {
    sessionStorage.setItem("currency", 0);
  } else {
    sessionStorage.setItem("currency", currencyValue);
  }

  var spentValue = parseInt(sessionStorage.getItem("currencySpent"));
  spentValue += input;

  // Keep the total pulls capped at a certain amount.
  if (spentValue > 999999999)
  {
    sessionStorage.setItem("currencySpent", 999999999);
  } else {
    sessionStorage.setItem("currencySpent", spentValue);
  }

  var pullsValue = parseInt(sessionStorage.getItem("totalPulls"));
  pullsValue += 1;

  // Keep the total pulls capped at a certain amount.
  if (pullsValue > 999999999)
  {
    sessionStorage.setItem("totalPulls", 999999999);
  } else {
    sessionStorage.setItem("totalPulls", pullsValue);
  }

  updateTracker();
}

function createImg(character, image) {
  // "character" represents the 4th value in each character array, obtained from the history string.
  // "image" represents the image location on the page.
  var imgNode = document.createElement('img');
  imgNode.id = "iconDisplay" + image;
  imgNode.width = 100;
  imgNode.height = 100;
  imgNode.onclick = function() { displayFullImage(this.id); };

  matchFound = false;

  // Look through the platinumRank array first.
  // Note the use of x, y, and z instead of i, since i is already used by the function that calls on this one.
  // src is for the icon image, longdesc is for the full image, and alt is for the character descriptions.
  for (var x = 0; x < platinumRank.length; x++) {
    if (platinumRank[x][3] == character) {
      imgNode.src = platinumRank[x][0];
      imgNode.longdesc = platinumRank[x][1];
      imgNode.alt = platinumRank[x][2];

      matchFound = true;
      break;
    }
  }

  // If no match was found, then check the goldRank array next.
  for (var x = 0; x < goldRank.length; x++) {
    if (goldRank[x][3] == character) {
      imgNode.src = goldRank[x][0];
      imgNode.longdesc = goldRank[x][1];
      imgNode.alt = goldRank[x][2];

      matchFound = true;
      break;
    }
  }

  // If no match was found, then check the silverRank array next.
  if (!matchFound) {
    for (var y = 0; y < silverRank.length; y++) {
      if (silverRank[y][3] == character) {
        imgNode.src = silverRank[y][0];
        imgNode.longdesc = silverRank[y][1];
        imgNode.alt = silverRank[y][2];

        matchFound = true;
        break;
      }
    }
  }

  // If still no match was found, then check the bronzeRank array.
  if (!matchFound) {
    for (var z = 0; z < bronzeRank.length; z++) {
      if (bronzeRank[z][3] == character) {
        imgNode.src = bronzeRank[z][0];
        imgNode.longdesc = bronzeRank[z][1];
        imgNode.alt = bronzeRank[z][2];

        matchFound = true;
        break;
      }
    }
  }

  // If still no match was found, then finally check the tinRank array.
  if (!matchFound) {
    for (var z = 0; z < tinRank.length; z++) {
      if (tinRank[z][3] == character) {
        imgNode.src = tinRank[z][0];
        imgNode.longdesc = tinRank[z][1];
        imgNode.alt = tinRank[z][2];

        matchFound = true;
        break;
      }
    }
  }

  // So now the full imgNode will represent an icon of a specific character.
  return imgNode;
}

function setupHistoryPage() {
  if (sessionStorage.getItem("pullHistory") == "") {
    document.getElementById("descriptionSelect").innerHTML = "No pull history currently available.";
  } else {
    currentHistory = convertPullHistory();

    // Use InsertRow(0) to enter new rows at the beginning. That way it will display the pulls in order
    // from most recent (the last ones in the history string) to oldest.
    var table;
    var row;
    var cell;
    var cellImg;
    i = 0; // This will increment with each pull.
    imageSpot = 0; // This has to increment with each image, instead of each pull!

    while (i < currentHistory.length){
      table = document.getElementById("pastPulls");
      row = table.insertRow(0);

      if (currentHistory[i].length == 1) {
        // For a single pull, we can just process the single value.
        cell = row.insertCell(0);
        cellImg = createImg(parseInt(currentHistory[i][0]), imageSpot);
        cell.appendChild(cellImg);

        imageSpot++;
      }
      else {
        j = 0; // Incrementing with each character in a multi-character pull.

        // If a pull has more than one value, need to put all the icons on one row.
        while (j < currentHistory[i].length) {
          cell = row.insertCell(0);
          cellImg = createImg(parseInt(currentHistory[i][j]), imageSpot);
          cell.appendChild(cellImg);

          j++;
          imageSpot++;
        }
      }

      i++;
    }
  }
}
