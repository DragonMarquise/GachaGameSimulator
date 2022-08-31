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
    var totalCharacters = teraRank.length + gigaRank.length + megaRank.length + kiloRank.length + standardRank.length + 110;
    // Note that the 110 represents the total number of costumes. The total is used here instead of having to retrieve the full
    // arrays just to get their length. Each array has 10 costumes, and there are 11 themes total. If additional costumes/themes
    // are added in the future, this number will need to be updated accordingly.

    var i = 1;
    while (i <= totalCharacters) {
      sessionStorage.setItem("iconDisplay" + i, 0);
      i++;
    }
  }

  // Keep the tracker up to date with the player's current currency and pulls.
  // Due to functionality in the rest of the code, these will cap out at
  // 999,999,999 and 9,999 respectively.
  document.getElementById("tracker").innerHTML = "--- Zenny: " + sessionStorage.getItem("currency")
                                        + " --- Zenny spent so far: " + sessionStorage.getItem("currencySpent")
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
// Note that \' must be used instead of just ' in order to allow for apostrophes in strings.

const teraRank = [
  ['Images_Icons/1_TeraIcons/Icon_Serenade.png', 'Images_Full/1_Tera/Tera_Serenade.png', 'Praise be, the Ruler of the Undernet! And their operator as well. Don\'t be fooled, Mamoru is a more intense operator than people give him credit for.', 1],
  ['Images_Icons/1_TeraIcons/Icon_OmegaMan.png', 'Images_Full/1_Tera/Tera_OmegaMan.png', 'A version of MegaMan from an alternate universe, where he killed Lan in order to gain ultimate power. Now he\'s arrived in this world to fight Lan and MegaMan, to prove that the power of friendship is just a falsehood.', 2],
  ['Images_Icons/1_TeraIcons/Icon_KingProg.png', 'Images_Full/1_Tera/Tera_KingProg.png', 'And all will know the Name of the King...', 3],
  ['Images_Icons/1_TeraIcons/Icon_Slur.png', 'Images_Full/1_Tera/Tera_Slur.png', 'An extraterrestrial Navi who has come to Earth to judge humanity. Will Earth be able to save itself, or will it be doomed to crumble?', 4],
  ['Images_Icons/1_TeraIcons/Icon_Cache.png', 'Images_Full/1_Tera/Tera_Cache.png', 'A Navi-like being born from discarded cache data. He hates humanity based on the cache data he has seen, and is now plotting to destory humans by any means necessary.', 5]
]

const gigaRank = [
  ['Images_Icons/2_GigaIcons/Icon_Lan.png', 'Images_Full/2_Giga/Giga_Lan.png', 'The dynamic duo, always here to save the day! They\'ve already done it for at least 6 games and 5 anime seasons, and they\'re not gonna stop anytime soon!', 6],
  ['Images_Icons/2_GigaIcons/Icon_Chaud.png', 'Images_Full/2_Giga/Giga_Chaud.png', 'A top rank NetBattler, an Official NetBattler at that, and the vice president of his dad\'s company. Him and ProtoMan are here to fight crime!', 7],
  ['Images_Icons/2_GigaIcons/Icon_Baryl.png', 'Images_Full/2_Giga/Giga_Baryl.png', 'Top net commanders who helped save the world in the fifth Battle Network game, but they turned out to be secretly working for World Three the whole time. Colonel was said to be deleted and Baryl lost, but that\'s apparently not the case...', 8],
  ['Images_Icons/2_GigaIcons/Icon_Bass.png', 'Images_Full/2_Giga/Giga_Bass.png', 'A vicious solo Navi, Bass is constantly looking to make himself stronger. One of his main goals is to finally beat Lan and MegaMan.', 9],
  ['Images_Icons/2_GigaIcons/Icon_Zero.png', 'Images_Full/2_Giga/Giga_Zero.png', 'Originally a virus, Zero grained Navihood thanks to Lan and MegaMan! He now journeys through the Net, trying to learn more about life.', 10],
  ['Images_Icons/2_GigaIcons/Icon_PharaohMan.png', 'Images_Full/2_Giga/Giga_PharaohMan.png', 'PharaohMan is a powerful guardian Navi, mainly with the purpose of guarding data for World Three. Unfortunately it means he doesn\'t get to go out much.', 11],
  ['Images_Icons/2_GigaIcons/Icon_PlanetMan.png', 'Images_Full/2_Giga/Giga_PlanetMan.png', 'PlanetMan once had the goal of resurrecting World Three, but was defeated soundly by Lan and MegaMan. Now he just acts as a guardian Navi, much like PharaohMan. They get together sometimes to play card games!', 12],
  ['Images_Icons/2_GigaIcons/Icon_LifeVirus.png', 'Images_Full/2_Giga/Giga_LifeVirus.png', 'A powerful virus that was created to infect and destroy Net society, and it would have succeeded if it weren\'t for those meddling twins.', 13],
  ['Images_Icons/2_GigaIcons/Icon_Gospel.png', 'Images_Full/2_Giga/Giga_Gospel.png', 'A digital beast generated from a mass of bugs, the Gospel Beast was created by accident but now serves to cause chaos and destruction!', 14],
  ['Images_Icons/2_GigaIcons/Icon_Alpha.png', 'Images_Full/2_Giga/Giga_Alpha.png', 'Originally a prototype of the modern Net, Alpha gained intelligence and instinct on par with an amoeba, and tried to eat and destory everything it could connect to. Maybe if they did better debugging this wouldn\'t have happened!', 15],
  ['Images_Icons/2_GigaIcons/Icon_Duo.png', 'Images_Full/2_Giga/Giga_Duo.png', 'A gigantic computer program from outer space, Duo has come to judge humanity. He has threatened to destory the planet in the past, and now it seems he\'s back for a second judgement!', 16],
  ['Images_Icons/2_GigaIcons/Icon_NebulaGray.png', 'Images_Full/2_Giga/Giga_NebulaGray.png', 'A monstrous program created to amplify negative emotions as well as acting as a source for Dark Chips. It sole purpose is to basically fill the world with pure evil!', 17],
  ['Images_Icons/2_GigaIcons/Icon_Gregar.png', 'Images_Full/2_Giga/Giga_Gregar.png', 'A digital being made of bugs much like Gospel, this creature threatened to destroy the Net in the past, and has been resurrected to do the same now!', 18],
  ['Images_Icons/2_GigaIcons/Icon_Falzar.png', 'Images_Full/2_Giga/Giga_Falzar.png', 'A digital being that was designed to combat Gregar, it went out of control and now threatens to destory the world it was meant to save! ', 19],
  ['Images_Icons/2_GigaIcons/Icon_Django.png', 'Images_Full/2_Giga/Giga_Django.png', 'The main protagonist from the Boktai universe, he\'s here for a crossover! Taiyooooh!', 20],
  ['Images_Icons/2_GigaIcons/Icon_Count.png', 'Images_Full/2_Giga/Giga_Count.png', 'An antagonist from the Boktai universe, he would\'ve given Lan and MegaMan a lot of trouble if Django wasn\'t here to help.', 21],
  ['Images_Icons/2_GigaIcons/Icon_ShootingStars.png', 'Images_Full/2_Giga/Giga_ShootingStars.png', 'He\'s MegaMan, but from the future, and partly made of radio waves! And having no relation to Lan and MegaMan, besides the name. Still, at least he has a great sense of justice like our own MegaMan.', 22],
  ['Images_Icons/2_GigaIcons/Icon_Wan.png', 'Images_Full/2_Giga/Giga_Wan.png', 'A version of Lan and MegaMan from an alternate universe, where they embraced Dark Chips and even became top members of Nebula. They\'re now here to challenge Lan and MegaMan to see who\'s the strongest!', 23],
  ['Images_Icons/2_GigaIcons/Icon_Wily.png', 'Images_Full/2_Giga/Giga_Wily.png', 'One of the main antagonists of the series, he wants to destroy Net society as revenge for his robotics project getting pushed aside. He had a change of heart by the final game, but who know if that will last...', 24],
  ['Images_Icons/2_GigaIcons/Icon_TrojanHorse.png', 'Images_Full/2_Giga/Giga_TrojanHorse.png', 'An ancient cybernetic being created by a long-gone civilization, it was resurrected to destory the modern world.', 25]
]

const megaRank = [
  ['Images_Icons/3_MegaIcons/Icon_FireMan.png', 'Images_Full/3_Mega/Mega_FireMan.png', 'An arsonist and his Navi, these two are well known for causing fire-based havoc.', 26],
  ['Images_Icons/3_MegaIcons/Icon_HeatMan.png', 'Images_Full/3_Mega/Mega_HeatMan.png', 'They may be teachers now, but neither Mr. Match nor HeatMan are afraid to BURN YOU TO THE GROUND!!', 27],
  ['Images_Icons/3_MegaIcons/Icon_FlameMan.png', 'Images_Full/3_Mega/Mega_FlameMan.png', 'FlameMan is Match\'s strongest Navi yet, and he\'s here to prove it to everyone!', 28],
  ['Images_Icons/3_MegaIcons/Icon_Madd.png', 'Images_Full/3_Mega/Mega_Madd.png', 'An obnoxious lady and her fun loving Navi, they both love to prank people and hack things for their own amusement.', 29],
  ['Images_Icons/3_MegaIcons/Icon_CountZap.png', 'Images_Full/3_Mega/Mega_CountZap.png', 'A (very) loud and eccentric man who works as a hacker for World Three. His Navi isn\'t entirely keen on this career choice, but he\'s going along with it out of boredom anyways.', 30],
  ['Images_Icons/3_MegaIcons/Icon_Yahoot.png', 'Images_Full/3_Mega/Mega_Yahoot.png', 'Though not much is known about their past before World Three, one thing is certain: they\'re a force to be reckoned with, and those who underestimate them will be swiftly deleted.', 31],
  ['Images_Icons/3_MegaIcons/Icon_StoneMan.png', 'Images_Full/3_Mega/Mega_StoneMan.png', 'A stalwart Navi, he may not talk very well, but he\'s certainly not a pushover in terms of raw power!', 32],
  ['Images_Icons/3_MegaIcons/Icon_BombMan.png', 'Images_Full/3_Mega/Mega_BombMan.png', 'A bombastic Navi who loves to cause chaos on the Net with explosions. Don\'t get in his way, or you\'ll be blasted away!', 33],
  ['Images_Icons/3_MegaIcons/Icon_Froid.png', 'Images_Full/3_Mega/Mega_Froid.png', 'One of the top employees at the local Waterworks, Dr. Froid and IceMan work hard to provide clean water to the whole town.', 34],
  ['Images_Icons/3_MegaIcons/Icon_Arashi.png', 'Images_Full/3_Mega/Mega_Arashi.png', 'An arrogant jerk who joined Gospel for his own selfish greed. They both act tough, but it\'s nothing but hot air.', 35],
  ['Images_Icons/3_MegaIcons/Icon_Dave.png', 'Images_Full/3_Mega/Mega_Dave.png', 'They want to protect nature, but unfortunately they take it to such an extreme as to threaten humanity as a result. Dave in particular thinks that his high IQ is an excuse to do what he does.', 36],
  ['Images_Icons/3_MegaIcons/Icon_CutMan.png', 'Images_Full/3_Mega/Mega_CutMan.png', 'A solo Navi who\'s in cahoots with Gospel, deep down he\'s just in it for the money to be able to care for his little brothers... or so he says.', 37],
  ['Images_Icons/3_MegaIcons/Icon_Gauss.png', 'Images_Full/3_Mega/Mega_Gauss.png', 'This guy is the CEO of his own company, and yet he has decided to turn to crime for one reason or another.', 38],
  ['Images_Icons/3_MegaIcons/Icon_Sean.png', 'Images_Full/3_Mega/Mega_Sean.png', 'The true leader of Gospel, this young boy withdrew from society due to trauma, which unfortunately lead to him harboring a lot of hate towards humanity. He\'s turned thing around ever since he met Lan and MegaMan, though he still has a seriosu attitude.', 39],
  ['Images_Icons/3_MegaIcons/Icon_Raoul.png', 'Images_Full/3_Mega/Mega_Raoul.png', 'An Official NetBattler from Netopia, Raoul and his Navi are determine to keep their home city safe for everyone, as well as the Net at large.', 40],
  ['Images_Icons/3_MegaIcons/Icon_Millions.png', 'Images_Full/3_Mega/Mega_Millions.png', 'She lives up to her name by being a millionare. She owns an international chain of jewelry stores, but she\'s gotten bored of that. Now she seeks strong NetBattlers to get a thrill out of battling them.', 41],
  ['Images_Icons/3_MegaIcons/Icon_Rei.png', 'Images_Full/3_Mega/Mega_Rei.png', 'An ambitious man and his faithful Navi, these two are hoping to climb the ranks of World Three to get the recognition they think they deserve.', 42],
  ['Images_Icons/3_MegaIcons/Icon_Inukai.png', 'Images_Full/3_Mega/Mega_Inukai.png', 'A former circus leader turned hacker, Inukai is determined to show the world that he\'s not going down without a fight! His Navi feels much the same, seeing life as a constant battle over survival of the fittest.', 43],
  ['Images_Icons/3_MegaIcons/Icon_BubbleMan.png', 'Images_Full/3_Mega/Mega_BubbleMan.png', 'He\'ll pretend to be a coward, running away or commanding minions to fight for him. But it\'s all a ruse to get people to underestimate him once they finally fight him!', 44],
  ['Images_Icons/3_MegaIcons/Icon_Tamako.png', 'Images_Full/3_Mega/Mega_Tamako.png', 'She runs a gift shop at the hot springs, but that\'s just a side hustle compared to her main love: NetBattling! Her Navi shares her same fiery spirit for battling, even if he isn\'t as external about it as his operator.', 45],
  ['Images_Icons/3_MegaIcons/Icon_Tora.png', 'Images_Full/3_Mega/Mega_Tora.png', 'A chess prodigy, Tora has designed his Navi to peerfectly suit his needs, both for chess and NetBattling. KingMan has the patience of a saint to put up with his operator so much.', 46],
  ['Images_Icons/3_MegaIcons/Icon_Sunayama.png', 'Images_Full/3_Mega/Mega_Sunayama.png', 'Dramatic to a fault, Sunayama is obsessed with TV ratings, even as a hacker. His Navi DesertMan isn\'t quite as dramatic, but he\'s definitely a powerful opponent in NetBattles.', 47],
  ['Images_Icons/3_MegaIcons/Icon_Anetta.png', 'Images_Full/3_Mega/Mega_Anetta.png', 'Anetta is a cheerful young lady who loves nature and will do anything to protect it! Unfortunately, both World Three and even her own Navi have been manipulating her to harm humanity during her quest to save nature.', 48],
  ['Images_Icons/3_MegaIcons/Icon_MistMan.png', 'Images_Full/3_Mega/Mega_MistMan.png', 'A mysterious Navi, he acts as a protector of the Undernet. He takes his job very seriously, butting heads with BowlMan over spending so much time bowling.', 49],
  ['Images_Icons/3_MegaIcons/Icon_BowlMan.png', 'Images_Full/3_Mega/Mega_BowlMan.png', 'A tough but good-natured Navi, he acts as a protector of the Undernet. But in reality, he spends most of his time bowling and is laidback, which causes him to butt heads with MistMan over their jobs.', 50],
  ['Images_Icons/3_MegaIcons/Icon_DrillMan.png', 'Images_Full/3_Mega/Mega_DrillMan.png', 'A ruthless World Three Navi, he and BubbleMan are somehow cousins. Don\'t ask how that works...', 51],
  ['Images_Icons/3_MegaIcons/Icon_DarkMan.png', 'Images_Full/3_Mega/Mega_DarkMan.png', 'Assassin turned guardian, he works to guard the Secret Area of the Undernet. He was promised that if he could beat 10,000 opponents in a row, he could have a rematch against Serenade.', 52],
  ['Images_Icons/3_MegaIcons/Icon_YamatoMan.png', 'Images_Full/3_Mega/Mega_YamatoMan.png', 'Serenade\'s right-hand Navi, this guy works hard to protect the Secret Area from all intruders. He\'s very wary of DarkMan, but at least acknowledges that having extra security is a good thing.', 53],
  ['Images_Icons/3_MegaIcons/Icon_ShadeMan.png', 'Images_Full/3_Mega/Mega_ShadeMan.png', 'A Darkloid working for Nebula, this guy seems to not care for much besides causing chaos and misery.', 54],
  ['Images_Icons/3_MegaIcons/Icon_Shuko.png', 'Images_Full/3_Mega/Mega_Shuko.png', 'This absolute unlucky klutz and her delicate Navi are just trying to do their best in the world. Unfortunately for them, the world likes to pick on them!', 55],
  ['Images_Icons/3_MegaIcons/Icon_Terry.png', 'Images_Full/3_Mega/Mega_Terry.png', 'A genius with robotics, but not so much NetBattling. He\'s hoping to have his grandpa fund his robot projects, but his grandpa thinks he\'s too much of a spoiled brat to get much done.', 56],
  ['Images_Icons/3_MegaIcons/Icon_TopMan.png', 'Images_Full/3_Mega/Mega_TopMan.png', 'An old man and his also old (somehow?) Navi. It\'s a but of a miracle that these two can get anything done, especially since Topman has a tendency to glitch out at random.', 57],
  ['Images_Icons/3_MegaIcons/Icon_KiteMan.png', 'Images_Full/3_Mega/Mega_KiteMan.png', 'An old man and his kite! This guy is the twin brother of TopMan\'s operator.', 58],
  ['Images_Icons/3_MegaIcons/Icon_Atsuki.png', 'Images_Full/3_Mega/Mega_Atsuki.png', 'This fiery youth and his Navi are hoping to burn down the competition. Too bad they only ever end up burning themselves.', 59],
  ['Images_Icons/3_MegaIcons/Icon_Narcy.png', 'Images_Full/3_Mega/Mega_Narcy.png', 'A narcissistic producer with a very fitting name, Narcy and VideoMan plan to take the movie production world by storm with their new digital techniques!', 60],
  ['Images_Icons/3_MegaIcons/Icon_Lilly.png', 'Images_Full/3_Mega/Mega_Lilly.png', 'A priestess from a far away island, and the guardian Navi that she is in charge of caring for. But most of the time it ends up being the other way around, with WindMan trying to make sure Lilly doesn\'t end up drunk...', 61],
  ['Images_Icons/3_MegaIcons/Icon_IvanChillski.png', 'Images_Full/3_Mega/Mega_IvanChillski.png', 'Hailing from Sharo, these two definitely prefer the cold to anything remotely warm. And apparently Electopia is way to warm for them!', 62],
  ['Images_Icons/3_MegaIcons/Icon_JunkMan.png', 'Images_Full/3_Mega/Mega_JunkMan.png', 'A lonely Navi that was somehow created from junk data, this guy just wants a friend...', 63],
  ['Images_Icons/3_MegaIcons/Icon_Regal.png', 'Images_Full/3_Mega/Mega_Regal.png', 'Dr. Regal cares for nothing other than proving himself right. Which mainly means proving that humanity is evil to its core, and manipulating this fact for his own needs.', 64],
  ['Images_Icons/3_MegaIcons/Icon_Tesla.png', 'Images_Full/3_Mega/Mega_Tesla.png', 'Daughter of Gauss Magnets, Tesla is hoping to revive her father\'s company and make it better than ever! Meanwhile, MagnetMan is only here because he doesn\'t like the idea of becoming a solo Navi...', 65],
  ['Images_Icons/3_MegaIcons/Icon_Charlie.png', 'Images_Full/3_Mega/Mega_Charlie.png', 'An over-confident flirt, this guy does have actual skills with piloting, so he\'s at least not bluffing that part. GyroMan\'s design was secretly inspired by Charlie\'s love of Transformers, but good luck getting him to admit that.', 66],
  ['Images_Icons/3_MegaIcons/Icon_Nenji.png', 'Images_Full/3_Mega/Mega_Nenji.png', 'This pyrotechnician works hard to put on the best firework shows! Rumor has it his Navi used to be a World Three solo Navi, but that\'s probably just a rumor...', 67],
  ['Images_Icons/3_MegaIcons/Icon_Raika.png', 'Images_Full/3_Mega/Mega_Raika.png', 'Apparently Sharo doesn\'t mind child soldiers, because this 13 year old and his Navi are both high ranking commanders in their home country\'s army.', 68],
  ['Images_Icons/3_MegaIcons/Icon_Jasmine.png', 'Images_Full/3_Mega/Mega_Jasmine.png', 'A student of all kinds of medicine, Jasmine is traveling the world with her Navi to learn as much as she can, and help as many people as she can!', 69],
  ['Images_Icons/3_MegaIcons/Icon_Pride.png', 'Images_Full/3_Mega/Mega_Pride.png', 'Formerly members of Gospel, this princess and her loyal Navi are doing their best to protect their home country and bring it back to its former glory.', 70],
  ['Images_Icons/3_MegaIcons/Icon_Dusk.png', 'Images_Full/3_Mega/Mega_Dusk.png', 'A pair of assassins, both Dusk and ShadowMan will kill anyone for the right price. Though it seems they might have had a change of heart recently...', 71],
  ['Images_Icons/3_MegaIcons/Icon_Dingo.png', 'Images_Full/3_Mega/Mega_Dingo.png', 'This rambunctious youth and his Navi are real fighters to the very end! They\'re incredibly loyal to their friends and family, willing to push themselves to the limit to keep everyone safe.', 72],
  ['Images_Icons/3_MegaIcons/Icon_LarkMan.png', 'Images_Full/3_Mega/Mega_LarkMan.png', 'Looking more like a swallow than a lark, this solo Navi flies around the Net without anything or anyone to tie him down. He\'s willing to NetBattle if he finds a worthy opponent, but otherwise he prefers to stay out of other people\'s business.', 73],
  ['Images_Icons/3_MegaIcons/Icon_BlizzardMan.png', 'Images_Full/3_Mega/Mega_BlizzardMan.png', 'Skiing is this Darkloid\'s one true love! That and destroying humans with their own hatred.', 74],
  ['Images_Icons/3_MegaIcons/Icon_CloudMan.png', 'Images_Full/3_Mega/Mega_CloudMan.png', 'This gloomy-looking Darkloid is determine to put a stop to anyone who challenges Nebula.', 75],
  ['Images_Icons/3_MegaIcons/Icon_CosmoMan.png', 'Images_Full/3_Mega/Mega_CosmoMan.png', 'Effectively the second-in-command of Nebula, this Darkloid claims to be the controller of the "world of darkness"...', 76],
  ['Images_Icons/3_MegaIcons/Icon_Pat.png', 'Images_Full/3_Mega/Mega_Pat.png', 'Expert chefs from Yumland, these two have come to Electopia to teach Net Cooking classes! They\'re hoping to have more people spread the word about this amazing cooking technique.', 77],
  ['Images_Icons/3_MegaIcons/Icon_AnnZap.png', 'Images_Full/3_Mega/Mega_AnnZap.png', 'The wife of Count Zap, she and ElecMan are struggling ever since Count Zap was arrested. Still, they\'re making do with what they have at this point.', 78],
  ['Images_Icons/3_MegaIcons/Icon_DarkScythe.png', 'Images_Full/3_Mega/Mega_DarkScythe.png', 'He claims to be an assassin and 12 years old at the same time, but one of those things is definitely a lie. Either way, these two offer assassination classes for anyone who\'s interested.', 79],
  ['Images_Icons/3_MegaIcons/Icon_AlFerry.png', 'Images_Full/3_Mega/Mega_AlFerry.png', '"You were 0.3 seconds late. Do it again." This train conductor always strives to be punctual, and he has the same expectations for his Navi.', 80],
  ['Images_Icons/3_MegaIcons/Icon_Master.png', 'Images_Full/3_Mega/Mega_Master.png', 'Ancient is a fitting word this describe this old master, since he\'s 120 years old. But don\'t assume his age makes him weak, or his Navi will be more than happy to blow you away!', 81],
  ['Images_Icons/3_MegaIcons/Icon_Moliarty.png', 'Images_Full/3_Mega/Mega_Moliarty.png', 'He and his Navi claim to be "expert hold diggers", but no one\'s really sure what that entails...', 82],
  ['Images_Icons/3_MegaIcons/Icon_Press.png', 'Images_Full/3_Mega/Mega_Press.png', 'Remember kids, you gotta recycle! This dork and his Navi are committed to getting more people to recycle.', 83],
  ['Images_Icons/3_MegaIcons/Icon_JoeMach.png', 'Images_Full/3_Mega/Mega_JoeMach.png', 'A kind and strict teacher, it turns out Joe and his Navi joined World Three in order to pay back a debt...', 84],
  ['Images_Icons/3_MegaIcons/Icon_Blackbeard.png', 'Images_Full/3_Mega/Mega_Blackbeard.png', 'You\'d think this guy would be more at home as a pirate on the high seas than a hacker. But then again, hackers can also pirate things!', 85],
  ['Images_Icons/3_MegaIcons/Icon_Yuika.png', 'Images_Full/3_Mega/Mega_Yuika.png', 'A spoiled brat and her creepy Navi, these two became hackers for World Three just for the fun of it. Yuika is more than happy to look down on just about everyone, and CircusMan follows her every command.', 86],
  ['Images_Icons/3_MegaIcons/Icon_Ito.png', 'Images_Full/3_Mega/Mega_Ito.png', 'This prosecutor is keen on punishing criminals to the fullest extent of the law. Unfortunately, him and his Navi are also interesting in rewriting the law as they see fit.', 87],
  ['Images_Icons/3_MegaIcons/Icon_Vic.png', 'Images_Full/3_Mega/Mega_Vic.png', 'Money? Fame? Revenge? No one knows why this punk is part of World Three, but he sure as hell isn\'t going to let anyone stop him from causing trouble! His Navi would prefer if he wasn\'t like this, but ElementMan doesn\'t have much of a choice now.', 88],
  ['Images_Icons/3_MegaIcons/Icon_HatMan.png', 'Images_Full/3_Mega/Mega_HatMan.png', 'Shuuichi and HatMan are here to put on a show! A magic show specifically! But Shuuichi still needs a lot more practice before he can become a professional magician.', 89],
  ['Images_Icons/3_MegaIcons/Icon_MaryTowa.png', 'Images_Full/3_Mega/Mega_MaryTowa.png', 'A shy girl and her very not-shy Navi, Mary tends to have a hard time getting Ring to listen to her.', 90],
  ['Images_Icons/3_MegaIcons/Icon_Kai.png', 'Images_Full/3_Mega/Mega_Kai.png', 'They both really look up to Lan and MegaMan, and they hope to train hard and become just as strong as them, if not stronger!', 91],
  ['Images_Icons/3_MegaIcons/Icon_Sherrice.png', 'Images_Full/3_Mega/Mega_Sherrice.png', 'This mysterious youth and her Navi both have a strong sense of justice, and strive to stop criminals whenever they can!', 92],
  ['Images_Icons/3_MegaIcons/Icon_BrightMan.png', 'Images_Full/3_Mega/Mega_BrightMan.png', 'Check it out! This Navi\'s operator may be unknown, but that\'s not gonna stop him from shining brightly in battle!', 93],
  ['Images_Icons/3_MegaIcons/Icon_GravityMan.png', 'Images_Full/3_Mega/Mega_GravityMan.png', 'This sentry Navi doesn\'t get to go out much due to his job. But in his spare time, he likes to put together Gundam models!', 94],
  ['Images_Icons/3_MegaIcons/Icon_NeedleMan.png', 'Images_Full/3_Mega/Mega_NeedleMan.png', 'His operator is a gardener, but this Navi seems very out of place for that kind of work...', 95],
  ['Images_Icons/3_MegaIcons/Icon_SwordMan.png', 'Images_Full/3_Mega/Mega_SwordMan.png', 'A master of the blade, or so he says. Each of his sword heads contains a different personality, and he can switch between them easily.', 96],
  ['Images_Icons/3_MegaIcons/Icon_StarMan.png', 'Images_Full/3_Mega/Mega_StarMan.png', 'This mischevious Navi works for World Three, but only as long as they keep things interesting for him. Despite his appearance, he can be a threat when he wants to cause major damage.', 97],
  ['Images_Icons/3_MegaIcons/Icon_Professor.png', 'Images_Full/3_Mega/Mega_Professor.png', 'Trying to follow in the footsteps of Dr. Wily, this nameless professor aims to destory net society once and for all!', 98]
]

const kiloRank = [
  ['Images_Icons/4_KiloIcons/Icon_SirProg.png', 'Images_Full/4_Kilo/Kilo_SirProg.png', 'A very valiant program, this Mr. Prog was designed to delete stonger viruses, apprehend Net Criminals, and keep the Net a safer place.', 99],
  ['Images_Icons/4_KiloIcons/Icon_ProgEsq.png', 'Images_Full/4_Kilo/Kilo_ProgEsq.png', 'A Mr. Prog with a law degree?! It\'s true! This little buddy is here to sue the pants off of criminals and rulebreakers! No wonder he doesn\'t have any friends.', 100],
  ['Images_Icons/4_KiloIcons/Icon_NinjaProg.png', 'Images_Full/4_Kilo/Kilo_NinjaProg.png', 'Mysterious and strong, this type of Mr. Prog is designed to set up and deactivate traps which help against unwanted hackers and viruses.', 101],
  ['Images_Icons/4_KiloIcons/Icon_DrProg.png', 'Images_Full/4_Kilo/Kilo_DrProg.png', 'This Mr. Prog is a trained medical professional! No, seriously, he has a degree and his work is on par with a real human doctor.', 102],
  ['Images_Icons/4_KiloIcons/Icon_IronFist.png', 'Images_Full/4_Kilo/Kilo_IronFist.png', 'The legendary Dr. Iron Fist, he\'s here to help, with punching!!', 103],
  ['Images_Icons/4_KiloIcons/Icon_Jennifer.png', 'Images_Full/4_Kilo/Kilo_Jennifer.png', 'Don\'t underestimate these two just because they\'re side charactrs. Jennifer and Exa are top rank NetBattlers from Netopia, and they\'re not afraid to battle anyone!', 104],
  ['Images_Icons/4_KiloIcons/Icon_Insectopedia.png', 'Images_Full/4_Kilo/Kilo_Insectopedia.png', 'A world-reowned entomologist, he and his Navi travel the globe to study all sorts of bugs, as well as teach people about the importance of bugs to our lives!', 105],
  ['Images_Icons/4_KiloIcons/Icon_Guilty.png', 'Images_Full/4_Kilo/Kilo_Guilty.png', 'An awful guy who\'s just looking to pick fights and steal people\'s data for his own greed.', 106],
  ['Images_Icons/4_KiloIcons/Icon_Criminal.png', 'Images_Full/4_Kilo/Kilo_Criminal.png', 'These two have run a lot of successful scams, including digging up people\'s data to blackmail them later.', 107],
  ['Images_Icons/4_KiloIcons/Icon_Liar.png', 'Images_Full/4_Kilo/Kilo_Liar.png', 'A member of Nebula, these two are definitely up to no good, though they\'ll still try to trick people into believing otherwise.', 108],
  ['Images_Icons/4_KiloIcons/Icon_Mick.png', 'Images_Full/4_Kilo/Kilo_Mick.png', 'A rude troublemaker from Central Town, he may be a friend of Lan\'s, but he\'s not gonna be a goody two-shoes just because of that!', 109],
  ['Images_Icons/4_KiloIcons/Icon_Tab.png', 'Images_Full/4_Kilo/Kilo_Tab.png', 'This kid works at his family\'s Battle Chip shop with the help of his Navi. They both have high hopes of expanding the shop in the future!', 110],
  ['Images_Icons/4_KiloIcons/Icon_Maylu.png', 'Images_Full/4_Kilo/Kilo_Maylu.png', 'One of Lan\'s best friends, Maylu is trying to get better at piano in between all the hacker shenanigans she has to deal with. Roll has been a great help in encouraging her to do her best!', 111],
  ['Images_Icons/4_KiloIcons/Icon_Yai.png', 'Images_Full/4_Kilo/Kilo_Yai.png', 'Though she acts like a rich brat most of the time, she and Glyde are genuinely good friends with Lan and the others.', 112],
  ['Images_Icons/4_KiloIcons/Icon_Dex.png', 'Images_Full/4_Kilo/Kilo_Dex.png', 'Though arrogant at times, Dex has proven time and again that he\'s a great NetBattler, even if he\'ll never quite make it to Lan\'s level.', 113],
  ['Images_Icons/4_KiloIcons/Icon_Higsby.png', 'Images_Full/4_Kilo/Kilo_Higsby.png', 'A weirdo obsessed with Battle Chips, he collects and sells them with the help of his Navi. NumberMan himself is also in charge of Mr. Higsby\'s finances, constantly berating his operator for buying Battle Chips at the cost of basic necessitites.', 114],
  ['Images_Icons/4_KiloIcons/Icon_Ribitta.png', 'Images_Full/4_Kilo/Kilo_Ribitta.png', 'This persistent reporter is always on the case to get the next big scoop! Her Navi is both her helper and enabler.', 115],
  ['Images_Icons/4_KiloIcons/Icon_Sal.png', 'Images_Full/4_Kilo/Kilo_Sal.png', 'These two run a sandwich stand as well as a flower shop. They\'re working together to raise money for various nature preservation projects throughout the world!', 116],
  ['Images_Icons/4_KiloIcons/Icon_Miyu.png', 'Images_Full/4_Kilo/Kilo_Miyu.png', 'Miyu runs an antique shop alongside her Navi. They both tend to creep people out with their appearance and personalities, but at least for Miyu she\'s not doing it intentionally...', 117],
  ['Images_Icons/4_KiloIcons/Icon_Masa.png', 'Images_Full/4_Kilo/Kilo_Masa.png', 'A fishmonger who tries to encourage people to get more calcium, by conveniently eating the fish he sells. His Navi acts as his business', 118],
  ['Images_Icons/4_KiloIcons/Icon_GateMan.png', 'Images_Full/4_Kilo/Kilo_GateMan.png', 'This guy has multiple Navis, and GateMan is just one of them! GateMan in particular is convenient for carrying a lot of stuff.', 119],
  ['Images_Icons/4_KiloIcons/Icon_Punk.png', 'Images_Full/4_Kilo/Kilo_Punk.png', 'Punk is one of Mr. Famous\' favorite Navis for NetBattling. They\'re both more than happy to go all out on any opponent!', 120],
  ['Images_Icons/4_KiloIcons/Icon_KendoMan.png', 'Images_Full/4_Kilo/Kilo_KendoMan.png', 'Mr. Famous was part of his high school\'s kendo team, so KendoMan is his way of trying to relive his glory days.', 121],
  ['Images_Icons/4_KiloIcons/Icon_GridMan.png', 'Images_Full/4_Kilo/Kilo_GridMan.png', 'Someone in this picture has clearly never read Peanuts. Hint, it\'s definitely not GridMan.', 122],
  ['Images_Icons/4_KiloIcons/Icon_Iris.png', 'Images_Full/4_Kilo/Kilo_Iris.png', 'A quiet girl who turned out to be a Navi. It was said she was deleted at some point, but she seems to be fine now...', 123]
]

const standardRank = [
  ['Images_Icons/5_StandardIcons/Icon_FastEddy.png', 'Images_Full/5_Standard/Standard_FastEddy.png', 'A standard boy with his standard Navi, the both of them hope to make it big someday!', 124],
  ['Images_Icons/5_StandardIcons/Icon_Candy.png', 'Images_Full/5_Standard/Standard_Candy.png', 'These two love to hang out with their friends on the Net, and they\'re surprisingly good NetBattlers too!', 125],
  ['Images_Icons/5_StandardIcons/Icon_Indigo.png', 'Images_Full/5_Standard/Standard_Indigo.png', 'Daigo is known by the username Koetsu online. They both like to share their knowledge of Battle Chips and virus busting on the BBS, hoping to help beginners around the Net.', 126],
  ['Images_Icons/5_StandardIcons/Icon_Pacifica.png', 'Images_Full/5_Standard/Standard_Pacifica.png', 'Pacifica hopes to someday get as good at cooking as Nanako!', 127],
  ['Images_Icons/5_StandardIcons/Icon_John.png', 'Images_Full/5_Standard/Standard_John.png', 'Old people can have Navis too! These two like to play chess in their free time, but John loses almost every time.', 128],
  ['Images_Icons/5_StandardIcons/Icon_Virtue.png', 'Images_Full/5_Standard/Standard_Virtue.png', 'Some Navis are especially designed to act as caretakers for the elderly, as is the case here.', 129],
  ['Images_Icons/5_StandardIcons/Icon_Mari.png', 'Images_Full/5_Standard/Standard_Mari.png', 'A lovely teacher and her Navi, both dedicated to helping students learn and grow!', 130],
  ['Images_Icons/5_StandardIcons/Icon_Haruka.png', 'Images_Full/5_Standard/Standard_Haruka.png', 'The wife of Dr. Yuichiro Hikari and mother of Lan (and technically MegaMan too), she\'s a homemaker who cares greatly for her family.', 131],
  ['Images_Icons/5_StandardIcons/Icon_Yuichiro.png', 'Images_Full/5_Standard/Standard_Yuichiro.png', 'Lan\'s father, Yuichiro is a brilliant scientist who\'s worked on a lot of advancements and important things for Net society, but evidently he\'s never heard of work-life balance.', 132],
  ['Images_Icons/5_StandardIcons/Icon_Prog.png', 'Images_Full/5_Standard/Standard_Prog.png', 'A hardworking program who helps clean up the Net and handles various functionalities on both the Net and in connected devices. All Mr. Progs deserve a big thank you for their help!', 133],
  ['Images_Icons/5_StandardIcons/Icon_ProfessorProg.png', 'Images_Full/5_Standard/Standard_ProfessorProg.png', 'A specialized Mr. Prog specifically for education work, Professor Prog is here to help students learn no matter what!', 134],
  ['Images_Icons/5_StandardIcons/Icon_FarmerProg.png', 'Images_Full/5_Standard/Standard_FarmerProg.png', 'You know those cyber vegetables from SlashMan\'s minigame in the sixth Battle Network game? Those were grown by Progs like this little fella!', 135]
]

// The arrays used for the special costume variations are in the getThemeArray() function.

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
    document.getElementById("ratesString").innerHTML = "Probabilities: <br> ---Tera Rank characters = 0.3%" +
                      "<br> ---Giga Rank characters = 0.7% <br> ---Mega Rank characters = 9%" +
                      "<br> ---Kilo Rank characters = 15% <br> ---Standard Rank characters = 75%";
  } else {
    // Set the string with the normal rates
    document.getElementById("ratesString").innerHTML = "Probabilities: <br> ---Tera Rank characters = 5%" +
                      "<br> ---Giga Rank characters = 10% <br> ---Mega Rank characters = 15%" +
                      "<br> ---Kilo Rank characters = 20% <br> ---Standard Rank characters = 50%";
  }
}

function generateRatesString_Giga(characterName) {
  // Specifically for the Giga Rank character banners, with a given character's name as input.
  trueGachaMode = retrieveTrueGacha();

  if (trueGachaMode)
  {
    // Set the string with the True Gacha Mode rates
    document.getElementById("ratesString").innerHTML = "Probabilities: <br> ---" + characterName + " = 0.4% <br> ---Tera Rank Characters = 0.3%" +
                      "<br> ---Other Giga Rank characters = 0.3% <br> ---Mega Rank characters = 9%" +
                      "<br> ---Kilo Rank characters = 15% <br> ---Standard Rank characters = 75%";
  } else {
    // Set the string with the normal rates
    document.getElementById("ratesString").innerHTML = "Probabilities: <br> ---" + characterName + " = 7% <br> ---Tera Rank Characters = 5%" +
                      "<br> ---Other Giga Rank characters = 3% <br> ---Mega Rank characters = 15%" +
                      "<br> ---Kilo Rank characters = 20% <br> ---Standard Rank characters = 50%";
  }
}

function generateRatesString_Tera(characterName) {
  // Specifically for the Tera Rank character banners, with a given character's name as input.
  trueGachaMode = retrieveTrueGacha();

  if (trueGachaMode)
  {
    // Set the string with the True Gacha Mode rates
    document.getElementById("ratesString").innerHTML = "Probabilities: <br> ---" + characterName + " = 0.2% <br> ---Other Tera Rank characters = 0.1%" +
                      "<br> ---Giga Rank characters = 0.7% <br> ---Mega Rank characters = 9%" +
                      "<br> ---Kilo Rank characters = 15% <br> ---Standard Rank character = 75%";
  } else {
    // Set the string with the normal rates
    document.getElementById("ratesString").innerHTML = "Probabilities: <br> ---" + characterName + " = 3% <br> ---Other Tera Rank characters = 2%" +
                      "<br> ---Giga Rank characters = 10% <br> ---Mega Rank characters = 15%" +
                      "<br> ---Kilo Rank characters = 20% <br> ---Standard Rank character = 50%";
  }
}

function generateRatesString_Theme(themeName) {
  // Specifically for the themed character banners, including costumes, with the given theme as input.
  trueGachaMode = retrieveTrueGacha();

  if (trueGachaMode)
  {
    // Set the string with the True Gacha Mode rates
    document.getElementById("ratesString").innerHTML = "Probabilities: <br> ---" + themeName + " = 0.8% <br> ---Tera Rank characters = 0.1%" +
                      "<br> ---Giga Rank characters = 0.1% <br> ---Mega Rank characters = 9%" +
                      "<br> ---Kilo Rank characters = 15% <br> ---Standard Rank character = 75%";
  } else {
    // Set the string with the normal rates
    document.getElementById("ratesString").innerHTML = "Probabilities: <br> ---" + themeName + " = 13% <br> ---Tera Rank characters = 1%" +
                      "<br> ---Giga Rank characters = 1% <br> ---Mega Rank characters = 15%" +
                      "<br> ---Kilo Rank characters = 20% <br> ---Standard Rank character = 50%";
  }
}

function newPull_Single() {
  // The Math.random() method basically returns a value between 0 and 1
  // (0.25, 0.37, etc.); the range includes 0 but excludes 1.

  // Also, use an array to keep track of the character per pull.
  var pullEntry = [];

  if (parseInt(sessionStorage.getItem("currency")) < 10) {
    // Only do a pull if the user has enough currency.
    document.getElementById("pullButton").innerHTML = "You need more Zenny!!";
    resetOnPull();
  } else {
    // Check the True Gacha Mode to see what rates to use.
    teraRate = 0;
    gigaRate = 0;
    megaRate = 0;
    kiloRate = 0;

    if (retrieveTrueGacha()){
      teraRate = 998;
      gigaRate = 991;
      megaRate = 901;
      kiloRate = 751;
    } else {
      teraRate = 950;
      gigaRate = 850;
      megaRate = 700;
      kiloRate = 500;
    }

    // The following returns a random number between 1 and 1000.
    var randomNumber = Math.floor((Math.random() * 1000) + 1);

    if (randomNumber >= teraRate) {
      // Get a random character from the Tera Rank array.
      randomIcon = Math.floor(Math.random() * teraRank.length);
      document.getElementById("iconDisplay").src = teraRank[randomIcon][0];
      document.getElementById("fullDisplay").src = teraRank[randomIcon][1];
      document.getElementById("descriptionSelect").innerHTML = teraRank[randomIcon][2];

      updateCharacterCount(teraRank[randomIcon][3]);
      pullEntry.push(teraRank[randomIcon][3]);
    } else if (randomNumber >= gigaRate) {
      // Get a random character from the Giga Rank array.
      randomIcon = Math.floor(Math.random() * gigaRank.length);
      document.getElementById("iconDisplay").src = gigaRank[randomIcon][0];
      document.getElementById("fullDisplay").src = gigaRank[randomIcon][1];
      document.getElementById("descriptionSelect").innerHTML = gigaRank[randomIcon][2];

      updateCharacterCount(gigaRank[randomIcon][3]);
      pullEntry.push(gigaRank[randomIcon][3]);
    } else if (randomNumber >= megaRate) {
      // Get a random icon from the Mega Rank array.
      randomIcon = Math.floor(Math.random() * megaRank.length);
      document.getElementById("iconDisplay").src = megaRank[randomIcon][0];
      document.getElementById("fullDisplay").src = megaRank[randomIcon][1];
      document.getElementById("descriptionSelect").innerHTML = megaRank[randomIcon][2];

      updateCharacterCount(megaRank[randomIcon][3]);
      pullEntry.push(megaRank[randomIcon][3]);
    } else if (randomNumber >= kiloRate) {
      // Get a random icon from the Kilo Rank array.
      randomIcon = Math.floor(Math.random() * kiloRank.length);
      document.getElementById("iconDisplay").src = kiloRank[randomIcon][0];
      document.getElementById("fullDisplay").src = kiloRank[randomIcon][1];
      document.getElementById("descriptionSelect").innerHTML = kiloRank[randomIcon][2];

      updateCharacterCount(kiloRank[randomIcon][3]);
      pullEntry.push(kiloRank[randomIcon][3]);
    } else {
      // Get a random icon from the Standard Rank array.
      randomIcon = Math.floor(Math.random() * standardRank.length);
      document.getElementById("iconDisplay").src = standardRank[randomIcon][0];
      document.getElementById("fullDisplay").src = standardRank[randomIcon][1];
      document.getElementById("descriptionSelect").innerHTML = standardRank[randomIcon][2];

      updateCharacterCount(standardRank[randomIcon][3]);
      pullEntry.push(standardRank[randomIcon][3]);
    }

    updateSessionVariables(5); // Update the tracker variables with the new pull.
    updatePagePulls();
    updatePullHistory(pullEntry);
  }
}

function megaKiloAndStandardRank(input, i) {
  // Check the True Gacha Mode to see what rates to use.
  megaRate = 0;
  kiloRate = 0;

  if (retrieveTrueGacha()){
    megaRate = 901;
    kiloRate = 751;
  } else {
    megaRate = 700;
    kiloRate = 500;
  }

  // To reduce repetitive code, handle the calculations for mega, kilo, and standard rank
  // for multi-pulls here.
  if (input >= megaRate) {
    // Get a random icon from the Mega Rank array.
    randomIcon = Math.floor(Math.random() * megaRank.length);
    document.getElementById("iconDisplay" + i).src = megaRank[randomIcon][0];
    document.getElementById("iconDisplay" + i).longdesc = megaRank[randomIcon][1];
    document.getElementById("iconDisplay" + i).alt = megaRank[randomIcon][2];

    return megaRank[randomIcon][3];
  } else if (input >= kiloRate) {
    // Get a random icon from the Kilo Rank array.
    randomIcon = Math.floor(Math.random() * kiloRank.length);
    document.getElementById("iconDisplay" + i).src = kiloRank[randomIcon][0];
    document.getElementById("iconDisplay" + i).longdesc = kiloRank[randomIcon][1];
    document.getElementById("iconDisplay" + i).alt = kiloRank[randomIcon][2];

    return kiloRank[randomIcon][3];
  } else {
    // Get a random icon from the Standard Rank array.
    randomIcon = Math.floor(Math.random() * standardRank.length);
    document.getElementById("iconDisplay" + i).src = standardRank[randomIcon][0];
    document.getElementById("iconDisplay" + i).longdesc = standardRank[randomIcon][1];
    document.getElementById("iconDisplay" + i).alt = standardRank[randomIcon][2];

    return standardRank[randomIcon][3];
  }
}

function resetOnPull() {
  // Reset the full display and description for each pull in a multi-pull.
  document.getElementById("fullDisplay").src = "Images_Icons/Icon_Placeholder.png";
  document.getElementById("descriptionSelect").innerHTML = "A description about the selected character will appear here.";
}

function bannerGigaRank(input, i) {
  // Handles the iconDisplay changes for a specific character from the gigaRank array.
  // This function is meant mainly for the banner pages, but also used for the multi-pulls.
  // In the latter case, the input is a random number rather than a specific number.
  document.getElementById("iconDisplay" + i).src = gigaRank[input][0];
  document.getElementById("iconDisplay" + i).longdesc = gigaRank[input][1];
  document.getElementById("iconDisplay" + i).alt = gigaRank[input][2];

  return gigaRank[input][3];
}

function bannerTeraRank(input, i) {
  // Similar to the bannerGigaRank() function, except this is using the teraRank array.
  document.getElementById("iconDisplay" + i).src = teraRank[input][0];
  document.getElementById("iconDisplay" + i).longdesc = teraRank[input][1];
  document.getElementById("iconDisplay" + i).alt = teraRank[input][2];

  return teraRank[input][3];
}

function newPull_Multi(pullNumber, price) {
  // A sort of extension of the single pull function, in this case mainly needed
  // to handle multiple characters at once.

  if (parseInt(sessionStorage.getItem("currency")) < 50) {
    // Only do a pull if the user has enough currency.
    document.getElementById("pullButton").innerHTML = "You need more Zenny!!";
    resetOnPull();
  } else {
    // Check the True Gacha Mode to see what rates to use.
    teraRate = 0;
    gigaRate = 0;

    if (retrieveTrueGacha()){
      teraRate = 998;
      gigaRate = 991;
    } else {
      teraRate = 950;
      gigaRate = 850;
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

      if (randomNumber >= teraRate) {
        // Get a random character from the Tera Rank array.
        randomIcon = Math.floor(Math.random() * teraRank.length);

        characterValue = bannerTeraRank(randomIcon, i);
        updateCharacterCount(characterValue);
        pullEntry.push(characterValue);
      } else if (randomNumber >= gigaRate) {
        // Giga rank chance is 10%
        // Get a random character from the Giga Rank array.
        randomIcon = Math.floor(Math.random() * gigaRank.length);

        characterValue = bannerGigaRank(randomIcon, i);
        updateCharacterCount(characterValue);
        pullEntry.push(characterValue);
      } else {
        characterValue = megaKiloAndStandardRank(randomNumber, i);
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
    document.getElementById("bannerMessage").innerHTML = "Congratulations, you got " + characterName + "!!";
  } else {
    document.getElementById("bannerMessage").innerHTML = "Sorry, try again...";
  }
}

function reducedGigaRank(input, i) {
  // A special function for handling the banner pulls, for the Giga rank characters
  // that will have a reduced chance due to the banner being for one specific Giga character.
  // The input represents the position of the banner character in the gigaRank array, and thus
  // the one part of the array that should be ignored here.
  tempArray = [];

  for (var x = 0; x < gigaRank.length; x++) {
    if (x != input) {
      tempArray.push(x);
    }
  }

  randomIcon = tempArray[Math.floor(Math.random() * tempArray.length)];
  document.getElementById("iconDisplay" + i).src = gigaRank[randomIcon][0];
  document.getElementById("iconDisplay" + i).longdesc = gigaRank[randomIcon][1];
  document.getElementById("iconDisplay" + i).alt = gigaRank[randomIcon][2];

  return gigaRank[randomIcon][3];
}

function newSpecialPull_Giga(input, characterName) {
  // A function for the Giga rank special banner pulls, acts as a variant of the 10+1 pulls.
  // "input" is the character's position in the gigaRank array, and "characterName" is just their name.

  if (parseInt(sessionStorage.getItem("currency")) < 75) {
    // Only do a pull if the user has enough currency.
    document.getElementById("pullButton").innerHTML = "You need more Zenny!!";
    resetOnPull();
  } else {
    // Check the True Gacha Mode to see what rates to use.
    gigaRate = 0;
    reducedGigaRate = 0;
    teraRate = 0;

    if (retrieveTrueGacha()){
      gigaRate = 997;
      reducedGigaRate = 994;
      teraRate = 991;
    } else {
      gigaRate = 930;
      reducedGigaRate = 900;
      teraRate = 850;
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

      if (randomNumber >= gigaRate) {
        // Improved rate for the banner character specifically.
        characterValue = bannerGigaRank(input, i);
        updateCharacterCount(characterValue);
        pullEntry.push(characterValue);

        obtained = true;
      } else if (randomNumber >= reducedGigaRate) {
        // Chance for the rest of the Giga rank characters is reduced.
        characterValue = reducedGigaRank(input, i);
        updateCharacterCount(characterValue);
        pullEntry.push(characterValue);
      } else if (randomNumber >= teraRate) {
        // Tera character rates stay the same.
        characterValue = bannerTeraRank(Math.floor(Math.random() * teraRank.length), i);
        updateCharacterCount(characterValue);
        pullEntry.push(characterValue);
      } else {
        characterValue = megaKiloAndStandardRank(randomNumber, i);
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

function reducedTeraRank(input, i) {
  // Similar to the function used for reduced Giga rank chances, with this one beginning
  // for the Tera rank instead.
  tempArray = [];

  for (var x = 0; x < teraRank.length; x++) {
    if (x != input) {
      tempArray.push(x);
    }
  }

  randomIcon = tempArray[Math.floor(Math.random() * tempArray.length)];
  document.getElementById("iconDisplay" + i).src = teraRank[randomIcon][0];
  document.getElementById("iconDisplay" + i).longdesc = teraRank[randomIcon][1];
  document.getElementById("iconDisplay" + i).alt = teraRank[randomIcon][2];

  return teraRank[randomIcon][3];
}

function newSpecialPull_Tera(input, characterName) {
  // A function for the Tera rank special banner pulls, acts as a variant of the 10+1 pulls.
  // "input" is the character's position in the teraRank array, and "characterName" is just their name.

  if (parseInt(sessionStorage.getItem("currency")) < 100) {
    // Only do a pull if the user has enough currency.
    document.getElementById("pullButton").innerHTML = "You need more Zenny!!";
    resetOnPull();
  } else {
    // Check the True Gacha Mode to see what rates to use.
    teraRate = 0;
    reducedTeraRate = 0;
    gigaRate = 0;

    if (retrieveTrueGacha()){
      teraRate = 999;
      reducedTeraRate = 998;
      gigaRate = 991;
    } else {
      teraRate = 970;
      reducedTeraRate = 950;
      gigaRate = 850;
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

      if (randomNumber >= teraRate) {
        // Improved rate for the banner character specifically.
        characterValue = bannerTeraRank(input, i);
        updateCharacterCount(characterValue);
        pullEntry.push(characterValue);

        obtained = true;
      } else if (randomNumber >= reducedTeraRate) {
        // Chance for the rest of the Tera rank characters is reduced.
        characterValue = reducedTeraRank(input, i);
        updateCharacterCount(characterValue);
        pullEntry.push(characterValue);
      } else if (randomNumber >= gigaRate) {
        // Giga character rates stay the same.
        characterValue = bannerGigaRank(Math.floor(Math.random() * gigaRank.length), i);
        updateCharacterCount(characterValue);
        pullEntry.push(characterValue);
      } else {
        characterValue = megaKiloAndStandardRank(randomNumber, i);
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

function getThemeArray(input) {
  var returnArray = [];

  switch(input) {
    case 0:
      // Lan and friends specifically
      returnArray = [1,6,7,39,69,72,90,91,109,110,111,112,113,123];
      break;
    case 1:
      // World Three members (BN1, BN3, and BN6)
      returnArray = [8,10,11,12,24,26,28,29,30,31,32,33,42,43,44,47,48,51,84,85,86,87,88,97,98,114];
      break;
      case 2:
      // Gospel members (BN2)
      returnArray = [35,36,37,38,39,70];
      break;
    case 3:
      // Nebula members (BN4 and BN5)
      returnArray = [23,54,64,74,75,76,108];
      break;
    case 4:
      // Team Colonel members
      returnArray = [8,70,71,72,114,115];
      break;
    case 5:
      // Team ProtoMan members
      returnArray = [7,65,66,67,68,69];
      break;
    case 6:
      // Characters that first appeared in BN1
      returnArray = [6,7,9,11,13,24,26,29,30,31,32,33,34,111,112,113,114,116,117,118,130,131,132,133];
      break;
    case 7:
      // Characters that first appeared in BN2
      returnArray = [12,14,27,35,36,37,38,39,40,41,70,71,103,104,105,115,119];
      break;
    case 8:
      // Characters that first appeared in BN3
      returnArray = [1,15,28,42,43,44,45,46,47,48,49,50,51,52,53,120];
      break;
    case 9:
      // Characters that first appeared in BN4
      returnArray = [16,54,55,56,57,58,59,60,61,62,63,64,68,121];
      break;
    case 10:
      // Characters that first appeared in BN5
      returnArray = [8,17,65,66,67,69,72,73,74,75,76,101,108,122];
      break;
    case 11:
      // Characters that first appeared in BN6
      returnArray = [18,19,77,78,79,80,81,82,83,84,85,86,87,88,109,110,123];
      break;
    case 12:
      // Side game/anime characters
      returnArray = [4,5,10,25,89,90,91,92,93,94,95,96,97,98];
      break;
    case 13:
      // "A Step into the Future" costumes
      returnArray = [
        ['Images_Icons/Costumes/Icon_FutureMamoru.png', 'Images_Full/Costumes/Tera_FutureMamoru.png', 'Mamoru continues to be an admin of the Undernet alongside Serenade, but he\'s also now got a day job at SciLab, working with Lan to help better society!', 136],
        ['Images_Icons/Costumes/Icon_FutureLan.png', 'Images_Full/Costumes/Giga_FutureLan.png', 'Now the head scientists at SciLabs just like his dad, Lan and MegaMan are more committed to helping the world while also not stressing themselves out with unneeded overtime.', 137],
        ['Images_Icons/Costumes/Icon_FutureChaud.png', 'Images_Full/Costumes/Giga_FutureChaud.png', 'Chaud is now the head of the International Official NetBattlers association! Though it seems growing up didn\'t help him with his fashion sense...', 138],
        ['Images_Icons/Costumes/Icon_FutureSean.png', 'Images_Full/Costumes/Mega_FutureSean.png', 'Being friends with Lan led Sean to get more interested in programming and networks, and as an adult he now works at Scilabs, along with FreezeMan of course.', 139],
        ['Images_Icons/Costumes/Icon_FutureMick.png', 'Images_Full/Costumes/Kilo_FutureMick.png', 'It seems Mick has finally managed to sort himself out, following in Mr. Mach\'s footsteps and becoming a school teacher!', 140],
        ['Images_Icons/Costumes/Icon_FutureTab.png', 'Images_Full/Costumes/Kilo_FutureTab.png', 'Tab\'s worked really hard to grow his family\'s business, and looks like he\'s gonna go far with his new Aster World department store!', 141],
        ['Images_Icons/Costumes/Icon_FutureMaylu.png', 'Images_Full/Costumes/Kilo_FutureMaylu.png', 'Sure, she got to marry Lan in the end, but Maylu also went on to become a world famous pianist. Good for her!', 142],
        ['Images_Icons/Costumes/Icon_FutureYai.png', 'Images_Full/Costumes/Kilo_FutureYai.png', 'First Electopia, tomorrow the world! Looks like Yai\'s family business is doing better than ever under her leadership, but at what cost to the rest of the world...?', 143],
        ['Images_Icons/Costumes/Icon_FutureDex.png', 'Images_Full/Costumes/Kilo_FutureDex.png', 'No one would have expected for Dex of all people to have what it takes to become mayor of ACDC Town, but he sure showed them! Gutsman even acts as his own personal bodyguard.', 144],
        ['Images_Icons/Costumes/Icon_FutureAnetta.png', 'Images_Full/Costumes/Mega_FutureAnetta.png', 'After sorting out their issues, especially their involvement with World Three, Anetta and PlantMan have moved on to advocating for ways to preserve and protect nature, without threatening people\'s loves this time.', 145]
      ];
      break;
    case 14:
      // "A Step into the Past" costumes
      returnArray = [
        ['Images_Icons/Costumes/Icon_PastMatch.png', 'Images_Full/Costumes/Mega_PastMatch.png', 'When a kid gets deemed a lost cause just because of a little arson, and no one\'s interested in helping him get better, what has he got to lose at that point? So now he\'s ready to watch the world burn!', 146],
        ['Images_Icons/Costumes/Icon_PastMadd.png', 'Images_Full/Costumes/Mega_PastMadd.png', 'This troublemaking tagger has high hopes of actually making it big as an artist when she grows up. Too bad no one\'s willing to take her seriously. Oh well, there\'s always using blackmail to get you way!', 147],
        ['Images_Icons/Costumes/Icon_PastCountZap.png', 'Images_Full/Costumes/Mega_PastCountZap.png', 'It seems Count Zap and his wife Ann knew each other as kids! Doesn\'t look like they got along at first...', 148],
        ['Images_Icons/Costumes/Icon_PastYahoot.png', 'Images_Full/Costumes/Mega_PastYahoot.png', 'Not a lot of people know this, but MagicMan was based on one of Yahoot\'s D&D characters from when he was younger!', 149],
        ['Images_Icons/Costumes/Icon_PastYuichiro.png', 'Images_Full/Costumes/Standard_PastYuichiro.png', 'Even as a child, it seem Yuichiro was a genuine prodigy, creating the prototype for Navis well before he became a proper scientist.', 150],
        ['Images_Icons/Costumes/Icon_PastHaruka.png', 'Images_Full/Costumes/Standard_PastHaruka.png', 'Very few people would ever suspect that Haruka used to be an outright delinquent when she was younger! She seems to have mellowed out since then, but she still looks back on those years with fondness.', 151],
        ['Images_Icons/Costumes/Icon_PastWily.png', 'Images_Full/Costumes/Giga_PastWily.png', 'Here we have Dr. Wily with Orchid, one of his first successful robots from his robotics project. Surely he\'ll be able to win the funding he needs for his project to improve society for the better!', 152],
        ['Images_Icons/Costumes/Icon_PastLan.png', 'Images_Full/Costumes/Giga_PastLan.png', 'In the Hikari household, twin brothers have arrived. Surely they will both live long and healthy lives!', 153],
        ['Images_Icons/Costumes/Icon_PastBass.png', 'Images_Full/Costumes/Giga_PastBass.png', 'Behold, Dr. Cossack\'s greatest creation, the AutoNavi! This Navi can function on its own without the need for a human operator. Surely this marks the start of an amazing new era of Navi development!', 154],
        ['Images_Icons/Costumes/Icon_PastTamako.png', 'Images_Full/Costumes/Mega_PastTamako.png', 'Few people know that Tamako is actually Mamoru\'s aunt. She\'s determined to be the best aunt ever to her little nephew!', 155]
      ];
      break;
    case 15:
      // "New Years" costumes
      returnArray = [
        ['Images_Icons/Costumes/Icon_NewYearsMatch.png', 'Images_Full/Costumes/Mega_NewYearsMatch.png', 'Watching the first sunrise of the year is a tradition in Electopia, and one that Match and HeatMan are more than eager to take part in!', 156],
        ['Images_Icons/Costumes/Icon_NewYearsMadd.png', 'Images_Full/Costumes/Mega_NewYearsMadd.png', 'Sometimes, when life sucks and it looks like the next year isn\'t going to be much better, it\'s good to just get together with a friend and get drunk on sake!', 157],
        ['Images_Icons/Costumes/Icon_NewYearsCountZap.png', 'Images_Full/Costumes/Mega_NewYearsCountZap.png', 'Celebrating the New Year with some champagne is a wonderful tradition! At least for Count Zap. ElecMan doesn\'t seems to care much for the flavor...', 158],
        ['Images_Icons/Costumes/Icon_NewYearsYahoot.png', 'Images_Full/Costumes/Mega_NewYearsYahoot.png', 'MagicMan pulled off an amazing magic trick here, an entire New Years fireworks show in one small box!', 159],
        ['Images_Icons/Costumes/Icon_NewYearsTab.png', 'Images_Full/Costumes/Kilo_NewYearsTab.png', 'Aster Land is having a huge end of the year sale, and Tab and Zipp are gonna make sure everyone knows about it!', 160],
        ['Images_Icons/Costumes/Icon_NewYearsKai.png', 'Images_Full/Costumes/Mega_NewYearsKai.png', 'There\'s a type of mochi soup eaten on New Years Day called ozoni. People believe eating it on the first day of the year will bring good luck, and Kai makes sure to do that every year. And besides, he thinks it\'s delicious!', 161],
        ['Images_Icons/Costumes/Icon_NewYearsTora.png', 'Images_Full/Costumes/Mega_NewYearsTora.png', 'Kagami mochi is a tradition New Years decoration, made up of two big mochi cakes topped with an orange. Tora thinks a chessboard themed around kagami mochi could be really appealing, but KingMan isn\'t so sure of that.', 162],
        ['Images_Icons/Costumes/Icon_NewYearsLilly.png', 'Images_Full/Costumes/Mega_NewYearsLilly.png', 'Looks like WindMan finally took up Lilly\'s offer of alcohol. Hope they\'re ready to deal with the hangover in the new year!', 163],
        ['Images_Icons/Costumes/Icon_NewYearsJunkMan.png', 'Images_Full/Costumes/Mega_NewYearsJunkMan.png', 'It\'s said that ringing a temple bell 108 times on New Years will help give you a fresh clean start for the next year. JunkMan is doing this in hopes that things improve for him in the new year!', 164],
        ['Images_Icons/Costumes/Icon_NewYearsRaoul.png', 'Images_Full/Costumes/Mega_NewYearsRaoul.png', 'Who\'s this?! It\'s totally not Raoul and ThunderMan, it\'s the Masked Brothers, here to wish you a happy New Year!', 165]
      ];
      break;
    case 16:
      // "Valentines" costumes
      returnArray = [
        ['Images_Icons/Costumes/Icon_ValentinesMatch.png', 'Images_Full/Costumes/Mega_ValentinesMatch.png', 'You\'d think a guy like Mr. Match wouldn\'t get nervous about giving flowers to someone, but evidently not. Wonder who they\'re for?', 166],
        ['Images_Icons/Costumes/Icon_ValentinesMadd.png', 'Images_Full/Costumes/Mega_ValentinesMadd.png', 'Ms. Madd ensures that her Valentine gets only the best chocolates! Meanwhile ColorMan seems to prefer eating chocolates himself instead of giving them to someone else.', 167],
        ['Images_Icons/Costumes/Icon_ValentinesCountZap.png', 'Images_Full/Costumes/Mega_ValentinesCountZap.png', 'Count Zap and Ann always give each other Valentine gifts, without fail! ElecMan seems to have gotten a ton of Valentines confessions and is considering his options...', 168],
        ['Images_Icons/Costumes/Icon_ValentinesYahoot.png', 'Images_Full/Costumes/Mega_ValentinesYahoot.png', 'Neither Yahoot nor MagicMan are really into the romantic aspect of Valentines, but they still like to make chocolates and sweets for all of their friends.', 169],
        ['Images_Icons/Costumes/Icon_ValentinesChaud.png', 'Images_Full/Costumes/Giga_ValentinesChaud.png', 'Chaud is dressed up for a meeting, but people keep thinking he\'s going on a date and sending him Valentines confessions! He sees them as nothing but junk mail. ProtoMan is in charge of cleaning them up, but it looks like he\'s getting overwhelmed.', 170],
        ['Images_Icons/Costumes/Icon_ValentinesMaryTowa.png', 'Images_Full/Costumes/Mega_ValentinesMaryTowa.png', 'Ring has finally convinced Mary to give a Valentines confession to her crush. Will things turn out alright for her?!', 171],
        ['Images_Icons/Costumes/Icon_ValentinesMaylu.png', 'Images_Full/Costumes/Kilo_ValentinesMaylu.png', 'With the power of love, Maylu and Roll and determined to help couples be happy on this special day!', 172],
        ['Images_Icons/Costumes/Icon_ValentinesCharlie.png', 'Images_Full/Costumes/Mega_ValentinesCharlie.png', 'This guy is a real flirt wherever he goes, just look at the crowd around him! GyroMan is getting sick of his operator\'s shenanigans, and really wishes he would settle down already.', 173],
        ['Images_Icons/Costumes/Icon_ValentinesMillions.png', 'Images_Full/Costumes/Mega_ValentinesMillions.png', 'Some operators and their Navis are a little closer than you would think, like these two. Is it weird? Well yeah, but at least they aren\'t hurting anyone.', 174],
        ['Images_Icons/Costumes/Icon_ValentinesYuika.png', 'Images_Full/Costumes/Mega_ValentinesYuika.png', 'Seems some people are really into the "obnoxious lady who insults you in the same sentence as a compliment", who knew? Meanwhile most people are so afraid of clowns, so CircusMan never gets a date. Poor guy!', 175]
      ];
      break;
    case 17:
      // "Easter" costumes
      returnArray = [
        ['Images_Icons/Costumes/Icon_EasterMatch.png', 'Images_Full/Costumes/Mega_EasterMatch.png', 'Easter is all about eggs, so clearly this is the perfect time to have some boiled eggs! FlameMan isn\'t sure if this is a real Easter tradition, but he doesn\'t know enough to actually refute this.', 176],
        ['Images_Icons/Costumes/Icon_EasterMadd.png', 'Images_Full/Costumes/Mega_EasterMadd.png', 'Why paint a simple chicken egg, when you can paint a gigantic egg?! Ms. Madd put together this egg scuplture just so she can paint it for Easter!', 177],
        ['Images_Icons/Costumes/Icon_EasterCountZap.png', 'Images_Full/Costumes/Mega_EasterCountZap.png', 'Chickens are also pretty relevant to Easter, what with the eggs and all. Looks like one of them has taken a shine to ElecMan, but he\'s not sure what to make of this.', 178],
        ['Images_Icons/Costumes/Icon_EasterYahoot.png', 'Images_Full/Costumes/Mega_EasterYahoot.png', 'It seems these rabbits have mistake MagicMan for one of their own! Maybe because his feelers look like rabbit ears? Or maybe he just smells like carrots.', 179],
        ['Images_Icons/Costumes/Icon_EasterShuko.png', 'Images_Full/Costumes/Mega_EasterShuko.png', 'Shuko just wanted to have a nice Easter with her Navi, but it looks like her natural lack of luck has struck again.', 180],
        ['Images_Icons/Costumes/Icon_EasterAlFerry.png', 'Images_Full/Costumes/Mega_EasterAlFerry.png', 'These two are determined to gets these eggs delivered on time, faster than the actual Easter Bunny!', 181],
        ['Images_Icons/Costumes/Icon_EasterMoliarty.png', 'Images_Full/Costumes/Mega_EasterMoliarty.png', 'Moliarty is convinced he\'s found the perfect hiding spot for Easter eggs: under the ground! GroundMan is trying to point out that this wouldn\'t be fair to kids who wouldn\'t think to bring their own shovels.', 182],
        ['Images_Icons/Costumes/Icon_EasterNarcy.png', 'Images_Full/Costumes/Mega_EasterNarcy.png', 'Behold, Narcy\'s greatest creation, HipHop.EXE! She\'s the perfect mascot to represent a holiday like Easter, don\'t you think?', 183],
        ['Images_Icons/Costumes/Icon_EasterArashi.png', 'Images_Full/Costumes/Mega_EasterArashi.png', 'You know that thing in the Zelda games, where if you piss off some chickens, they\'ll come after you? Yeah, that happens in real life too, as Arashi and AirMan are now learning.', 184],
        ['Images_Icons/Costumes/Icon_EasterBowlMan.png', 'Images_Full/Costumes/Mega_EasterBowlMan.png', 'There\'s a big bowling tournament happening around Easter, so BowlMan took the opportunity to dress up accordingly!', 185]
      ];
      break;
    case 18:
      // "Fireworks Festival" costumes
      returnArray = [
        ['Images_Icons/Costumes/Icon_FireworksMatch.png', 'Images_Full/Costumes/Mega_FireworksMatch.png', 'Looks like Mr. Match and HeatMan have managed to aqcuire a ton of fireworks! Surely they have good intentions with those fireworks and aren\'t up to anything bad...', 186],
        ['Images_Icons/Costumes/Icon_FireworksMadd.png', 'Images_Full/Costumes/Mega_FireworksMadd.png', 'Ms Madd has arrived in her finest yukata, just for the festival. She even managed to get one for ColorMan, with extra long sleeves!', 187],
        ['Images_Icons/Costumes/Icon_FireworksCountZap.png', 'Images_Full/Costumes/Mega_FireworksCountZap.png', 'Fireworks festicals always have a ton of great food, which is always enjoyable! There\'s plenty of prizes to win during these festivals as well, such as the neat water yo-yo that ElecMan got.', 188],
        ['Images_Icons/Costumes/Icon_FireworksYahoot.png', 'Images_Full/Costumes/Mega_FireworksYahoot.png', 'Curry may not be a "traditional" summer dish, but Yahoot\'s curry stand for the fireworks festival still gets a lot of customers every year!', 189],
        ['Images_Icons/Costumes/Icon_FireworksNenji.png', 'Images_Full/Costumes/Mega_FireworksNenji.png', 'Nenji is looking forward to this year\'s fireworks festival show, he\'s organizing it himself! However, NapalmMan has noticed there\'s some fireworks missing. Will he be able to track them down and save Nenji\'s big show?!', 190],
        ['Images_Icons/Costumes/Icon_FireworksHigsby.png', 'Images_Full/Costumes/Kilo_FireworksHigsby.png', 'There\'s a festival game called senbonbiki, where prizes are attached to jumbled up strings. Pull a string, get a prize! Unfortunately for Higsby, this stall has a bunch of rare battle chips as prizes, and he\'s already spent a ton of money trying to get them...', 191],
        ['Images_Icons/Costumes/Icon_FireworksDingo.png', 'Images_Full/Costumes/Mega_FireworksDingo.png', 'Festivals have all sorts of stall games that people can play, and one of them is catching goldfish with a thin paper net. Dingo is really good at this one!', 192],
        ['Images_Icons/Costumes/Icon_FireworksStarMan.png', 'Images_Full/Costumes/Mega_FireworksStarMan.png', 'Tanabata is a special summer festival where people can write their wishes on a piece of paper and then tie them on bamboo. Maybe those wishes will come true thanks to a certain someone...?', 193],
        ['Images_Icons/Costumes/Icon_FireworksAtsuki.png', 'Images_Full/Costumes/Mega_FireworksAtsuki.png', 'How did they get their hands on such a big firework rocket?! Of course they\'ll probably just say they bought it "legally" from a place they conveniently can\'t remember the name of...', 194],
        ['Images_Icons/Costumes/Icon_FireworksBombMan.png', 'Images_Full/Costumes/Mega_FireworksBombMan.png', 'BombMan is determined to put on the best fireworks show that anyone\'s ever seen, and he\'s certainly not going to let a human like Nenji beat him! He even managed to trick Mr. Match and Atsuki into stealing some of Nenji\'s fireworks!', 195]
      ];
      break;
    case 19:
      // "Harvest Moon" costumes
      returnArray = [
        ['Images_Icons/Costumes/Icon_HarvestMatch.png', 'Images_Full/Costumes/Mega_HarvestMatch.png', 'FlameMan wanted to try out making mochi, so Mr. Match has decided to show his Navi how it\'s done! It seems Mr. Match is getting a little too into it though.', 196],
        ['Images_Icons/Costumes/Icon_HarvestMadd.png', 'Images_Full/Costumes/Mega_HarvestMadd.png', 'There are various dishes with eggs added to them especially for the Harvest Moon, like these noodles that Ms. Madd and ColorMan are having. The unbroken egg yolk represents the full moon!', 197],
        ['Images_Icons/Costumes/Icon_HarvestCountZap.png', 'Images_Full/Costumes/Mega_HarvestCountZap.png', 'Ann has a special stew for this time of the year, and Count Zap is gathering up the vegetables needed for it! ElecMan would rather not get dragged into this kind of work, but he was told he\'d only get a bowl of stew if he helped out.', 198],
        ['Images_Icons/Costumes/Icon_HarvestYahoot.png', 'Images_Full/Costumes/Mega_HarvestYahoot.png', 'Since moving to Electopia, Yahoot and MagicMan haven\'t had a chance to participate in a traditional moon-viewing until now. It\'s quite calming to just look up at a gorgeous full moon!', 199],
        ['Images_Icons/Costumes/Icon_HarvestDex.png', 'Images_Full/Costumes/Kilo_HarvestDex.png', 'Despite his not-so-great NetBattling skills, Dex is a surprisingly good strategist, and he gets to show this off best when he\'s playing games like shogi! Poor GutsMan can\'t keep up.', 200],
        ['Images_Icons/Costumes/Icon_HarvestRei.png', 'Images_Full/Costumes/Mega_HarvestRei.png', 'Mooncakes are a traditional food served in various countries that celebrate the Harvest Moon, and Rei has a family recipe for them as well. FlashMan admits they taste better than he thought they would!', 201],
        ['Images_Icons/Costumes/Icon_HarvestPat.png', 'Images_Full/Costumes/Mega_HarvestPat.png', 'Only the freshest veggies at this vegetable stall! For the Harvest Moon, Pat serves special veggie dishes that she made from vegetables grown by her and SlashMan, specifically for this purpose.', 202],
        ['Images_Icons/Costumes/Icon_HarvestPress.png', 'Images_Full/Costumes/Mega_HarvestPress.png', 'Composting is a form of recycling, and Mr. Press has put his knowledge to good use to grow a whole bunch of tasty veggies. He\'s hoping to win a gardening competition too!', 203],
        ['Images_Icons/Costumes/Icon_HarvestMistMan.png', 'Images_Full/Costumes/Mega_HarvestMistMan.png', 'Look, the moon! The moon! The moon came out! Autumn is MistMan\'s favorite time of the year, but if you ask him why, he\'ll say it\'s because of the weather. In reality, a lot of his favorite sweets are only sold during autumn!', 204],
        ['Images_Icons/Costumes/Icon_HarvestYamatoMan.png', 'Images_Full/Costumes/Mega_HarvestYamatoMan.png', 'YamatoMan heard that humans like to make pyramids made of dango for the Harvest Moon. So he decided to try it out himself! Seems he went a little overboard, but at least he\'s having fun.', 205]
      ];
      break;
    case 20:
      // "Halloween" costumes
      returnArray = [
        ['Images_Icons/Costumes/Icon_HalloweenMatch.png', 'Images_Full/Costumes/Mega_HalloweenMatch.png', 'Mr. Match as a fire-breathing dragon, and HeatMan as a flaming pumpkin monster! Because of course they\'d want to incorporate fire into their own costumes too.', 206],
        ['Images_Icons/Costumes/Icon_HalloweenMadd.png', 'Images_Full/Costumes/Mega_HalloweenMadd.png', 'Ms. Madd decided to go as a sexy vampire this Halloween, while ColorMan decided to lean into his clown theming and go as a scary clown monster!', 207],
        ['Images_Icons/Costumes/Icon_HalloweenCountZap.png', 'Images_Full/Costumes/Mega_HalloweenCountZap.png', 'Look, they all have matching costumes as one big Frankenstein family! Though ElecMan only really went along with it because he couldn\'t think of a better costume for himself.', 208],
        ['Images_Icons/Costumes/Icon_HalloweenYahoot.png', 'Images_Full/Costumes/Mega_HalloweenYahoot.png', 'Truthfully MagicMan is already Halloween-themed, but this year he decided to dress as a mummy wizard. That\'s way more creative!', 209],
        ['Images_Icons/Costumes/Icon_HalloweenRaika.png', 'Images_Full/Costumes/Mega_HalloweenRaika.png', 'This is not Raika, oh no, he would be too embarassed if people found out that he still loves Halloween. SearchMan is here too by coincidence. His costume is a cheap onesie he found, since he\'s just here for the free candy.', 210],
        ['Images_Icons/Costumes/Icon_HalloweenLan.png', 'Images_Full/Costumes/Giga_HalloweenLan.png', 'Wow, MegaMan sure is living up to his costume as a scaredy cat! Lan is starting to regret bringing MegaMan along with him.', 211],
        ['Images_Icons/Costumes/Icon_HalloweenPlanetMan.png', 'Images_Full/Costumes/Giga_HalloweenPlanetMan.png', 'PlanetMan decided to put together a costume most people might not guess! For anyone curious, it\'s DJ Subatomic Supernova from the game No Straight Roads. You get a cookie if you guessed that already!', 212],
        ['Images_Icons/Costumes/Icon_HalloweenShadeMan.png', 'Images_Full/Costumes/Mega_HalloweenShadeMan.png', 'Shademan really enjoys the "trick" part of "trick or treat". Mainly in the sense of tricking other people into giving up their treats to him.', 213],
        ['Images_Icons/Costumes/Icon_HalloweenDarkMan.png', 'Images_Full/Costumes/Mega_HalloweenDarkMan.png', 'People like to make seriously scary costumes for Halloween, but DarkMan seems to have taken that to a horrifying extreme.', 214],
        ['Images_Icons/Costumes/Icon_HalloweenDarkScythe.png', 'Images_Full/Costumes/Mega_HalloweenDarkScythe.png', 'Sure, it\'s a bit cliche for an assassin to dress up as the Grim Reaper, but these two don\'t care. They just wanted easy costumes that would still let them scare people!', 215]
      ];
      break;
    case 21:
      // "Christmas" costumes
      returnArray = [
        ['Images_Icons/Costumes/Icon_ChristmasMatch.png', 'Images_Full/Costumes/Mega_ChristmasMatch.png', 'Behold, the two people who are actually delighted to get coal for Christmas. And who wouldn\'t be, it means having more things to burn!', 216],
        ['Images_Icons/Costumes/Icon_ChristmasMadd.png', 'Images_Full/Costumes/Mega_ChristmasMadd.png', 'These two are trying to figure out what they got for Christmas ahead of time. Some people really have no patiency for opening presents...', 217],
        ['Images_Icons/Costumes/Icon_ChristmasCountZap.png', 'Images_Full/Costumes/Mega_ChristmasCountZap.png', 'Aww, Count Zap and Ann are having a moment under the mistletoe, how sweet! Meanwhile ElecMan seeming to be enjoying a moment with some really good eggnog.', 218],
        ['Images_Icons/Costumes/Icon_ChristmasYahoot.png', 'Images_Full/Costumes/Mega_ChristmasYahoot.png', 'Every year for Christmas, Yahoot and MagicMan organize a charity kitchen, to help make sure everyone gets to have a good meal during the holidays. Doesn\'t exactly make up for all the stuff he did for World Three, but it\'s the thought that counts.', 219],
        ['Images_Icons/Costumes/Icon_ChristmasMamoru.png', 'Images_Full/Costumes/Tera_ChristmasMamoru.png', 'It seems Mamoru won\'t be able to get around without a wheelchair for the foreseeable future, even after his surgery. So Serenade was able to get him a more long-term wheelchair, so he can be more comfortable getting around!', 220],
        ['Images_Icons/Costumes/Icon_ChristmasInukai.png', 'Images_Full/Costumes/Mega_ChristmasInukai.png', 'Did you know they make cat toys for big cats, like lions and tigers? Inukai managed to get one for BeastMan, and it looks like he\'s loving it so far!', 221],
        ['Images_Icons/Costumes/Icon_ChristmasJasmine.png', 'Images_Full/Costumes/Mega_ChristmasJasmine.png', 'They say Christmas is the time to spread good cheer, and that\'s exactly what Jasmine plans to do! She\'s going to give as many people presents as possible. Medi appreciates her enthusiasm, but it\'s hard for her to keep up with Jasmine!', 222],
        ['Images_Icons/Costumes/Icon_ChristmasSal.png', 'Images_Full/Costumes/Kilo_ChristmasSal.png', 'Sal doesn\'t like to use real trees just for the sake of decorations, so this year she\'s opted to use her own Navi as a Christmas tree! WoodMan\'s not sure if he should take this as a compliment or an insult.', 223],
        ['Images_Icons/Costumes/Icon_ChristmasMick.png', 'Images_Full/Costumes/Kilo_ChristmasMick.png', 'Even during Christmas, these two just aren\'t interested in getting along...', 224],
        ['Images_Icons/Costumes/Icon_ChristmasLarkMan.png', 'Images_Full/Costumes/Mega_ChristmasLarkMan.png', 'On the first day of Christmas, my true love gave to me: A LarkMan in a pear tree!~', 225]
      ];
      break;
    case 22:
      // "Hot Summer Fun" costumes
      returnArray = [
        ['Images_Icons/Costumes/Icon_SummerMatch.png', 'Images_Full/Costumes/Mega_SummerMatch.png', 'You expect the summer heat to be too much, even for these two tough guys? Well think again!', 226],
        ['Images_Icons/Costumes/Icon_SummerMadd.png', 'Images_Full/Costumes/Mega_SummerMadd.png', 'ColorMan and Ms. Madd are enjoying their summer at the pool. He\'s even got a custom pool toy, based off his own ball!', 227],
        ['Images_Icons/Costumes/Icon_SummerCountZap.png', 'Images_Full/Costumes/Mega_SummerCountZap.png', 'Why is ElecMan being buried in the sand like this? Because he lost a bet. You\'re probably wondering, what was the bet? Don\'t ask!', 228],
        ['Images_Icons/Costumes/Icon_SummerYahoot.png', 'Images_Full/Costumes/Mega_SummerYahoot.png', 'It\'s good to take a break during the summer, and just relax in the sun with a friend. It\'s definitely something that Yahoot and MagicMan look forward to every year.', 229],
        ['Images_Icons/Costumes/Icon_SummerSunayama.png', 'Images_Full/Costumes/Mega_SummerSunayama.png', 'Though DesertMan is more, well, desert-themed, in reality his design comes from Sunayama\'s love of sand castles. He\'s still pretty good at making them too!', 230],
        ['Images_Icons/Costumes/Icon_SummerYai.png', 'Images_Full/Costumes/Kilo_SummerYai.png', 'Yai\'s out here enjoying the beach with her friends! Glyde is also tagging along, though mostly to make sure Yai doesn\'t get sunburnt.', 231],
        ['Images_Icons/Costumes/Icon_SummerTesla.png', 'Images_Full/Costumes/Mega_SummerTesla.png', 'It\'s nice to relax on the beach with someone who will tend to your every whim and need! Even if that someone isn\'t willing, but eh, details.', 232],
        ['Images_Icons/Costumes/Icon_SummerBlackbeard.png', 'Images_Full/Costumes/Mega_SummerBlackbeard.png', 'One of the things Blackbeard looks forward to with summer is getting to go deep sea fishing. He\'s a pro at it!', 233],
        ['Images_Icons/Costumes/Icon_SummerTerry.png', 'Images_Full/Costumes/Mega_SummerTerry.png', 'Sometimes, people will get sunburnt no matter how much sunscreen they put on, or even if they stay mostly in the shade. Such is Terry\'s plight, and he swears this is the last time he\'ll ever go to the beach!', 234],
        ['Images_Icons/Costumes/Icon_SummerVic.png', 'Images_Full/Costumes/Mega_SummerVic.png', 'This summer, Vic is gonna try out surfing! ElementMan is worried for his operator though, mostly because he\'s never surfed before in his life...', 235]
      ];
      break;
    case 23:
      // "Cold Winter Time" costumes
      returnArray = [
        ['Images_Icons/Costumes/Icon_WinterMatch.png', 'Images_Full/Costumes/Mega_WinterMatch.png', 'Would you rather brave the cold, or stay inside next to a nice and warm fireplace? Mr. Match and FlameMan have made it obvious here what their answer is.', 236],
        ['Images_Icons/Costumes/Icon_WinterMadd.png', 'Images_Full/Costumes/Mega_WinterMadd.png', 'Ms. Madd is the queen of snowball fights! ColorMan wishes he could win at least one game sometimes, but at least they\'re still both having fun together.', 237],
        ['Images_Icons/Costumes/Icon_WinterCountZap.png', 'Images_Full/Costumes/Mega_WinterCountZap.png', 'Making snow angels is one of Count Zap\'s favorite things to do during the winter! Unfortunately ElecMan is realizing that his pylons are getting in the way of his own snow angels.', 238],
        ['Images_Icons/Costumes/Icon_WinterYahoot.png', 'Images_Full/Costumes/Mega_WinterYahoot.png', 'When Yahoot first moved to Electopia to work in World Three, he wasn\'t use to things being so cold during the winter. Good thing MagicMan was able to take care of him while he adjusted!', 239],
        ['Images_Icons/Costumes/Icon_WinterIvanChillski.png', 'Images_Full/Costumes/Mega_WinterIvanChillski.png', 'Ivan and ColdMan are more than happy to be back home in Sharo, in their true element!', 240],
        ['Images_Icons/Costumes/Icon_WinterBlizzardMan.png', 'Images_Full/Costumes/Mega_WinterBlizzardMan.png', 'Looks like BlizzardMan didn\'t do too good on the Ski Free slopes this time. At least he didn\'t run into a yeti...', 241],
        ['Images_Icons/Costumes/Icon_WinterFroid.png', 'Images_Full/Costumes/Mega_WinterFroid.png', 'Winter time is the perfect time to make snowmen! Dr. Froid and IceMan have made a sort of tradition out of making at least one snowman per winter.', 242],
        ['Images_Icons/Costumes/Icon_WinterBaryl.png', 'Images_Full/Costumes/Giga_WinterBaryl.png', 'Iris knitted a scarf for Baryl and her brother Colonel. How thoughtful! Unfortunately, the resulting scarves are incredibly itchy, and both Baryl and Colonel don\'t want to say anything, out of fear of hurting Iris\' feelings...', 243],
        ['Images_Icons/Costumes/Icon_WinterPharaohMan.png', 'Images_Full/Costumes/Giga_WinterPharaohMan.png', 'Boy are we glad that he\'s frozen in there, and we\'re out here! Thankfully it looks like PharaohMan won\'t be thawing out until spring.', 245],
        ['Images_Icons/Costumes/Icon_WinterPride.png', 'Images_Full/Costumes/Mega_WinterPride.png', 'When it\'s an especially cold winter, there\'s nothing better than relaxing with some delicious hot cocoa!', 246]
      ];
      break;
    default:
      // No defaults
      break;
  }

  return returnArray;
}

function megaKiloAndStandardRank_Themes(input, i, themeArray) {
  // A variation of the regular megaKiloAndStandardRank() that takes in a themed array as input.
  // Check the True Gacha Mode to see what rates to use.
  megaRate = 0;
  kiloRate = 0;

  if (retrieveTrueGacha()){
    megaRate = 901;
    kiloRate = 751;
  } else {
    megaRate = 700;
    kiloRate = 500;
  }

  // To reduce repetitive code, handle the calculations for mega, kilo, and standard rank
  // for multi-pulls here.
  if (input >= megaRate) {
    // Get a random icon from the Mega Rank array.
    randomIcon = Math.floor(Math.random() * megaRank.length);

    // Make sure the selected character isn't already part of the themed array
    while (themeArray.indexOf(megaRank[randomIcon][3]) != -1) {
      randomIcon = Math.floor(Math.random() * megaRank.length);
    }

    document.getElementById("iconDisplay" + i).src = megaRank[randomIcon][0];
    document.getElementById("iconDisplay" + i).longdesc = megaRank[randomIcon][1];
    document.getElementById("iconDisplay" + i).alt = megaRank[randomIcon][2];

    return megaRank[randomIcon][3];
  } else if (input >= kiloRate) {
    // Get a random icon from the Kilo Rank array.
    randomIcon = Math.floor(Math.random() * kiloRank.length);

    // Make sure the selected character isn't already part of the themed array
    while (themeArray.indexOf(kiloRank[randomIcon][3]) != -1) {
      randomIcon = Math.floor(Math.random() * kiloRank.length);
    }

    document.getElementById("iconDisplay" + i).src = kiloRank[randomIcon][0];
    document.getElementById("iconDisplay" + i).longdesc = kiloRank[randomIcon][1];
    document.getElementById("iconDisplay" + i).alt = kiloRank[randomIcon][2];

    return kiloRank[randomIcon][3];
  } else {
    // Get a random icon from the Standard Rank array.
    randomIcon = Math.floor(Math.random() * standardRank.length);

    // Make sure the selected character isn't already part of the themed array
    while (themeArray.indexOf(standardRank[randomIcon][3]) != -1) {
      randomIcon = Math.floor(Math.random() * standardRank.length);
    }

    document.getElementById("iconDisplay" + i).src = standardRank[randomIcon][0];
    document.getElementById("iconDisplay" + i).longdesc = standardRank[randomIcon][1];
    document.getElementById("iconDisplay" + i).alt = standardRank[randomIcon][2];

    return standardRank[randomIcon][3];
  }
}

function bannerThemeRank(themeArray, i) {
  // This will search through the existing arrays for a random specific character.
  // Grab a random value from the theme array, and use it to get an existing character from the tier arrays.
  selectedCharacter = themeArray[Math.floor(Math.random() * themeArray.length)];

  let j = 0;
  matchFound = false;

  for (j = 0; j < teraRank.length; j++) {
    if (selectedCharacter == teraRank[j][3])
    {
      document.getElementById("iconDisplay" + i).src = teraRank[j][0];
      document.getElementById("iconDisplay" + i).longdesc = teraRank[j][1];
      document.getElementById("iconDisplay" + i).alt = teraRank[j][2];

      matchFound = true;
      break;
    }
  }

  if (!matchFound) {
    for (j = 0; j < gigaRank.length; j++) {
      if (selectedCharacter == gigaRank[j][3])
      {
        document.getElementById("iconDisplay" + i).src = gigaRank[j][0];
        document.getElementById("iconDisplay" + i).longdesc = gigaRank[j][1];
        document.getElementById("iconDisplay" + i).alt = gigaRank[j][2];

        matchFound = true;
        break;
      }
    }
  }

  if (!matchFound) {
    for (j = 0; j < megaRank.length; j++) {
      if (selectedCharacter == megaRank[j][3])
      {
        document.getElementById("iconDisplay" + i).src = megaRank[j][0];
        document.getElementById("iconDisplay" + i).longdesc = megaRank[j][1];
        document.getElementById("iconDisplay" + i).alt = megaRank[j][2];

        matchFound = true;
        break;
      }
    }
  }

  if (!matchFound) {
    for (j = 0; j < kiloRank.length; j++) {
      if (selectedCharacter == kiloRank[j][3])
      {
        document.getElementById("iconDisplay" + i).src = kiloRank[j][0];
        document.getElementById("iconDisplay" + i).longdesc = kiloRank[j][1];
        document.getElementById("iconDisplay" + i).alt = kiloRank[j][2];

        matchFound = true;
        break;
      }
    }
  }

  if (!matchFound) {
    for (j = 0; j < standardRank.length; j++) {
      if (selectedCharacter == standardRank[j][3])
      {
        document.getElementById("iconDisplay" + i).src = standardRank[j][0];
        document.getElementById("iconDisplay" + i).longdesc = standardRank[j][1];
        document.getElementById("iconDisplay" + i).alt = standardRank[j][2];

        matchFound = true;
        break;
      }
    }
  }

  return selectedCharacter;
}

function bannerCostumeRank(costumeArray, i) {
  // Grab a random character from the chosen costume array.
  selectedCharacter = Math.floor(Math.random() * costumeArray.length);

  document.getElementById("iconDisplay" + i).src = costumeArray[selectedCharacter][0];
  document.getElementById("iconDisplay" + i).longdesc = costumeArray[selectedCharacter][1];
  document.getElementById("iconDisplay" + i).alt = costumeArray[selectedCharacter][2];

  return costumeArray[selectedCharacter][3];
}

function newSpecialPull_Theme(input, themeName) {
  // A function for the special themed banners, which gives increased chances for characters
  // that fit a certain themed (from a particular game, member of a particular group, etc.)
  // This includes the costume banners as well.
  // "input" determines which themed array of characters to use.

  pullPrice = 0;

  if (input < 13)
  {
    // If the input is for the first 13 arrays (0 to 12), then the pull is for the character theme pulls.
    pullPrice = 200;
  }
  else {
    // Otherwise, the pull is for the special costume banners instead.
    pullPrice = 250;
  }

  if (parseInt(sessionStorage.getItem("currency")) < pullPrice) {
    // Only do a pull if the user has enough currency.
    document.getElementById("pullButton").innerHTML = "You need more Zenny!!";
    resetOnPull();
  } else {
    // Grab the specific array to use for this function call.
    var themeArray = [];
    themeArray = getThemeArray(input);

    // Check the True Gacha Mode to see what rates to use.
    themeRate = 0;
    teraRate = 0;
    gigaRate = 0;

    if (retrieveTrueGacha()){
      themeRate = 993;
      teraRate = 992;
      gigaRate = 991;
    } else {
      themeRate = 870;
      teraRate = 860;
      gigaRate = 850;
    }

    var randomNumber;
    let i = 1; // Have to start at 1 due to how the img id is set on the page.
    let obtained = false;

    // Use an array to keep track of the character per pull.
    var pullEntry = [];
    characterValue = 0;
    nonThemeSelection = 0;

    // Make use of variable i to populate all of the iconDisplays in the 10+1 pull page.
    while (i < 12) {
      // Set the random number in the while-loop, so it can be different on each loop.
      randomNumber = Math.floor((Math.random() * 1000) + 1);

      if (randomNumber >= themeRate) {
        // Improved rate for the banner theme specifically.
        // Check if we're pulling from the existing characters or the special costume arrays.

        if (input < 13) {
          characterValue = bannerThemeRank(themeArray, i);
        }
        else {
          characterValue = bannerCostumeRank(themeArray, i);
        }

        updateCharacterCount(characterValue);
        pullEntry.push(characterValue);

        obtained = true;
      } else if (randomNumber >= teraRate) {
        // Tera rank characters at 2%.
        // If selecting for the themed banners, check that it isn't already a character in the themed array.
        if (input < 13){
          nonThemeSelection = Math.floor(Math.random() * teraRank.length);

          while (themeArray.indexOf(teraRank[nonThemeSelection][3]) != -1){
            nonThemeSelection = Math.floor(Math.random() * teraRank.length);
          }

          characterValue = bannerTeraRank(nonThemeSelection, i);
        } else {
          characterValue = bannerTeraRank(Math.floor(Math.random() * teraRank.length), i);
        }

        updateCharacterCount(characterValue);
        pullEntry.push(characterValue);
      } else if (randomNumber >= gigaRate) {
        // Giga character rates stay the same.
        // If selecting for the themed banners, check that it isn't already a character in the themed array.
        if (input < 13){
          nonThemeSelection = Math.floor(Math.random() * gigaRank.length);

          while (themeArray.indexOf(gigaRank[nonThemeSelection][3]) != -1){
            nonThemeSelection = Math.floor(Math.random() * gigaRank.length);
          }

          characterValue = bannerGigaRank(nonThemeSelection, i);
        } else {
          characterValue = bannerGigaRank(Math.floor(Math.random() * gigaRank.length), i);
        }

        updateCharacterCount(characterValue);
        pullEntry.push(characterValue);
      } else {
        if (input < 13)
        {
          characterValue = megaKiloAndStandardRank_Themes(randomNumber, i, themeArray)
        } else {
          characterValue = megaKiloAndStandardRank(randomNumber, i);
        }

        updateCharacterCount(characterValue);
        pullEntry.push(characterValue);
      }

      i++;
    }

    specialPullMessages(obtained, themeName);
    resetOnPull();
    updateSessionVariables(pullPrice); // Update the tracker variables with the new pull.
    updatePagePulls();
    updatePullHistory(pullEntry);
  }
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

  while (j < teraRank.length){
    document.getElementById("iconDisplay" + i).src = teraRank[j][0];
    document.getElementById("iconDisplay" + i).longdesc = teraRank[j][1];
    document.getElementById("iconDisplay" + i).alt = "Number of copies obtained: "
                                                      + parseInt(sessionStorage.getItem("iconDisplay" + i))
                                                      + "<br>" + teraRank[j][2];

    i++;
    j++;
  }

  j = 0;

  while (j < gigaRank.length){
    document.getElementById("iconDisplay" + i).src = gigaRank[j][0];
    document.getElementById("iconDisplay" + i).longdesc = gigaRank[j][1];
    document.getElementById("iconDisplay" + i).alt = "Number of copies obtained: "
                                                      + parseInt(sessionStorage.getItem("iconDisplay" + i))
                                                      + "<br>" + gigaRank[j][2];

    i++;
    j++;
  }

  j = 0;

  while (j < megaRank.length){
    document.getElementById("iconDisplay" + i).src = megaRank[j][0];
    document.getElementById("iconDisplay" + i).longdesc = megaRank[j][1];
    document.getElementById("iconDisplay" + i).alt = "Number of copies obtained: "
                                                      + parseInt(sessionStorage.getItem("iconDisplay" + i))
                                                      + "<br>" + megaRank[j][2];

    i++;
    j++;
  }

  j = 0;

  while (j < kiloRank.length){
    document.getElementById("iconDisplay" + i).src = kiloRank[j][0];
    document.getElementById("iconDisplay" + i).longdesc = kiloRank[j][1];
    document.getElementById("iconDisplay" + i).alt = "Number of copies obtained: "
                                                      + parseInt(sessionStorage.getItem("iconDisplay" + i))
                                                      + "<br>" + kiloRank[j][2];

    i++;
    j++;
  }

  j = 0;

  while (j < standardRank.length){
    document.getElementById("iconDisplay" + i).src = standardRank[j][0];
    document.getElementById("iconDisplay" + i).longdesc = standardRank[j][1];
    document.getElementById("iconDisplay" + i).alt = "Number of copies obtained: "
                                                      + parseInt(sessionStorage.getItem("iconDisplay" + i))
                                                      + "<br>" + standardRank[j][2];

    i++;
    j++;
  }
}

function loadingCostumeGallery(input) {
  // This is specifically for the Costume Gallery. Input is an int representing which costume array
  // to load for the images. All costume themes should be limited to 10 costumes each.
  var themeArray = [];
  themeArray = getThemeArray(input);

  for (var i = 0; i < themeArray.length; i++){
    document.getElementById("iconDisplay" + i).src = themeArray[i][0];
    document.getElementById("iconDisplay" + i).longdesc = themeArray[i][1];
    document.getElementById("iconDisplay" + i).alt = "Number of copies obtained: "
                                                      + parseInt(sessionStorage.getItem("iconDisplay" + themeArray[i][3]))
                                                      + "<br>" + themeArray[i][2];
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
    document.getElementById("amount").innerHTML = "Sorry, you're already maxed out on Zenny!";
  } else {
    sessionStorage.setItem("currency", value);
    document.getElementById("amount").innerHTML = "You got " + randomNumber + " Zenny!";
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

  x = 0;
  matchFound = false;

  // Look through the teraRank array first.
  // Note the use of x instead of i, since i is already used by the function that calls on this one.
  // src is for the icon image, longdesc is for the full image, and alt is for the character descriptions.
  for (x = 0; x < teraRank.length; x++) {
    if (teraRank[x][3] == character) {
      imgNode.src = teraRank[x][0];
      imgNode.longdesc = teraRank[x][1];
      imgNode.alt = teraRank[x][2];

      matchFound = true;
      break;
    }
  }

  // If no match was found, then check the gigaRank array next.
  if (!matchFound) {
    for (x = 0; x < gigaRank.length; x++) {
      if (gigaRank[x][3] == character) {
        imgNode.src = gigaRank[x][0];
        imgNode.longdesc = gigaRank[x][1];
        imgNode.alt = gigaRank[x][2];

        matchFound = true;
        break;
      }
    }
  }

  // If no match was found, then check the megaRank array next.
  if (!matchFound) {
    for (x = 0; x < megaRank.length; x++) {
      if (megaRank[x][3] == character) {
        imgNode.src = megaRank[x][0];
        imgNode.longdesc = megaRank[x][1];
        imgNode.alt = megaRank[x][2];

        matchFound = true;
        break;
      }
    }
  }

  // If still no match was found, then check the kiloRank array.
  if (!matchFound) {
    for (x = 0; x < kiloRank.length; x++) {
      if (kiloRank[x][3] == character) {
        imgNode.src = kiloRank[x][0];
        imgNode.longdesc = kiloRank[x][1];
        imgNode.alt = kiloRank[x][2];

        matchFound = true;
        break;
      }
    }
  }

  // If still no match was found, then check the standardRank array.
  if (!matchFound) {
    for (x = 0; x < standardRank.length; x++) {
      if (standardRank[x][3] == character) {
        imgNode.src = standardRank[x][0];
        imgNode.longdesc = standardRank[x][1];
        imgNode.alt = standardRank[x][2];

        matchFound = true;
        break;
      }
    }
  }

  // At this point if matchFound is still false, that means it must be in one of the costume arrays.

  var themeArray = [];

  if (!matchFound) {
    themeArray = getThemeArray(13);

    for (x = 0; x < themeArray.length; x++) {
      if (themeArray[x][3] == character) {
        imgNode.src = themeArray[x][0];
        imgNode.longdesc = themeArray[x][1];
        imgNode.alt = themeArray[x][2];

        matchFound = true;
        break;
      }
    }
  }

  if (!matchFound) {
    themeArray = getThemeArray(14);

    for (x = 0; x < themeArray.length; x++) {
      if (themeArray[x][3] == character) {
        imgNode.src = themeArray[x][0];
        imgNode.longdesc = themeArray[x][1];
        imgNode.alt = themeArray[x][2];

        matchFound = true;
        break;
      }
    }
  }

  if (!matchFound) {
    themeArray = getThemeArray(15);

    for (x = 0; x < themeArray.length; x++) {
      if (themeArray[x][3] == character) {
        imgNode.src = themeArray[x][0];
        imgNode.longdesc = themeArray[x][1];
        imgNode.alt = themeArray[x][2];

        matchFound = true;
        break;
      }
    }
  }

  if (!matchFound) {
    themeArray = getThemeArray(16);

    for (x = 0; x < themeArray.length; x++) {
      if (themeArray[x][3] == character) {
        imgNode.src = themeArray[x][0];
        imgNode.longdesc = themeArray[x][1];
        imgNode.alt = themeArray[x][2];

        matchFound = true;
        break;
      }
    }
  }

  if (!matchFound) {
    themeArray = getThemeArray(17);

    for (x = 0; x < themeArray.length; x++) {
      if (themeArray[x][3] == character) {
        imgNode.src = themeArray[x][0];
        imgNode.longdesc = themeArray[x][1];
        imgNode.alt = themeArray[x][2];

        matchFound = true;
        break;
      }
    }
  }

  if (!matchFound) {
    themeArray = getThemeArray(18);

    for (x = 0; x < themeArray.length; x++) {
      if (themeArray[x][3] == character) {
        imgNode.src = themeArray[x][0];
        imgNode.longdesc = themeArray[x][1];
        imgNode.alt = themeArray[x][2];

        matchFound = true;
        break;
      }
    }
  }

  if (!matchFound) {
    themeArray = getThemeArray(19);

    for (x = 0; x < themeArray.length; x++) {
      if (themeArray[x][3] == character) {
        imgNode.src = themeArray[x][0];
        imgNode.longdesc = themeArray[x][1];
        imgNode.alt = themeArray[x][2];

        matchFound = true;
        break;
      }
    }
  }

  if (!matchFound) {
    themeArray = getThemeArray(20);

    for (x = 0; x < themeArray.length; x++) {
      if (themeArray[x][3] == character) {
        imgNode.src = themeArray[x][0];
        imgNode.longdesc = themeArray[x][1];
        imgNode.alt = themeArray[x][2];

        matchFound = true;
        break;
      }
    }
  }

  if (!matchFound) {
    themeArray = getThemeArray(21);

    for (x = 0; x < themeArray.length; x++) {
      if (themeArray[x][3] == character) {
        imgNode.src = themeArray[x][0];
        imgNode.longdesc = themeArray[x][1];
        imgNode.alt = themeArray[x][2];

        matchFound = true;
        break;
      }
    }
  }

  if (!matchFound) {
    themeArray = getThemeArray(22);

    for (x = 0; x < themeArray.length; x++) {
      if (themeArray[x][3] == character) {
        imgNode.src = themeArray[x][0];
        imgNode.longdesc = themeArray[x][1];
        imgNode.alt = themeArray[x][2];

        matchFound = true;
        break;
      }
    }
  }

  if (!matchFound) {
    themeArray = getThemeArray(21);

    for (x = 0; x < themeArray.length; x++) {
      if (themeArray[x][3] == character) {
        imgNode.src = themeArray[x][0];
        imgNode.longdesc = themeArray[x][1];
        imgNode.alt = themeArray[x][2];

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
