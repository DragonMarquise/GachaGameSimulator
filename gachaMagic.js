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
    var totalCharacters = teraRank.length + gigaRank.length + megaRank.length + kiloRank.length + standardRank.length;
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

const teraRank = [
  ['Images_Icons/1_TeraIcons/Icon_Serenade.png', 'Images_Full/1_Tera/Tera_Serenade.png', 'www \' for apostrophes', 1],
  ['Images_Icons/1_TeraIcons/Icon_OmegaMan.png', 'Images_Full/1_Tera/Tera_OmegaMan.png', 'www \' for apostrophe', 2],
  ['Images_Icons/1_TeraIcons/Icon_KingProg.png', 'Images_Full/1_Tera/Tera_KingProg.png', 'www \' for apostrophe', 3],
  ['Images_Icons/1_TeraIcons/Icon_Slur.png', 'Images_Full/1_Tera/Tera_Slur.png', 'www \' for apostrophe', 4],
  ['Images_Icons/1_TeraIcons/Icon_Cache.png', 'Images_Full/1_Tera/Tera_Cache.png', 'www \' for apostrophe', 5]
]

const gigaRank = [
  ['Images_Icons/2_GigaIcons/Icon_Lan.png', 'Images_Full/2_Giga/Giga_Lan.png', 'www \' for apostrophe', 6],
  ['Images_Icons/2_GigaIcons/Icon_Chaud.png', 'Images_Full/2_Giga/Giga_Chaud.png', 'www \' for apostrophe', 7],
  ['Images_Icons/2_GigaIcons/Icon_Baryl.png', 'Images_Full/2_Giga/Giga_Baryl.png', 'www \' for apostrophe', 8],
  ['Images_Icons/2_GigaIcons/Icon_Bass.png', 'Images_Full/2_Giga/Giga_Bass.png', 'www \' for apostrophe', 9],
  ['Images_Icons/2_GigaIcons/Icon_Zero.png', 'Images_Full/2_Giga/Giga_Zero.png', 'www \' for apostrophe', 10],
  ['Images_Icons/2_GigaIcons/Icon_PharaohMan.png', 'Images_Full/2_Giga/Giga_PharaohMan.png', 'www \' for apostrophe', 11],
  ['Images_Icons/2_GigaIcons/Icon_PlanetMan.png', 'Images_Full/2_Giga/Giga_PlanetMan.png', 'www \' for apostrophe', 12],
  ['Images_Icons/2_GigaIcons/Icon_LifeVirus.png', 'Images_Full/2_Giga/Giga_LifeVirus.png', 'www \' for apostrophe', 13],
  ['Images_Icons/2_GigaIcons/Icon_Gospel.png', 'Images_Full/2_Giga/Giga_Gospel.png', 'www \' for apostrophe', 14],
  ['Images_Icons/2_GigaIcons/Icon_Alpha.png', 'Images_Full/2_Giga/Giga_Alpha.png', 'www \' for apostrophe', 15],
  ['Images_Icons/2_GigaIcons/Icon_Duo.png', 'Images_Full/2_Giga/Giga_Duo.png', 'www \' for apostrophe', 16],
  ['Images_Icons/2_GigaIcons/Icon_NebulaGray.png', 'Images_Full/2_Giga/Giga_NebulaGray.png', 'www \' for apostrophe', 17],
  ['Images_Icons/2_GigaIcons/Icon_Gregar.png', 'Images_Full/2_Giga/Giga_Gregar.png', 'www \' for apostrophe', 18],
  ['Images_Icons/2_GigaIcons/Icon_Falzar.png', 'Images_Full/2_Giga/Giga_Falzar.png', 'www \' for apostrophe', 19],
  ['Images_Icons/2_GigaIcons/Icon_Django.png', 'Images_Full/2_Giga/Giga_Django.png', 'www \' for apostrophe', 20],
  ['Images_Icons/2_GigaIcons/Icon_Count.png', 'Images_Full/2_Giga/Giga_Count.png', 'www \' for apostrophe', 21],
  ['Images_Icons/2_GigaIcons/Icon_ShootingStars.png', 'Images_Full/2_Giga/Giga_ShootingStars.png', 'www \' for apostrophe', 22],
  ['Images_Icons/2_GigaIcons/Icon_Wan.png', 'Images_Full/2_Giga/Giga_Wan.png', 'www \' for apostrophe', 23]
]

const megaRank = [
  ['Images_Icons/3_MegaIcons/Icon_FireMan.png', 'Images_Full/3_Mega/Mega_FireMan.png', 'www \' for apostrophe', 24],
  ['Images_Icons/3_MegaIcons/Icon_HeatMan.png', 'Images_Full/3_Mega/Mega_HeatMan.png', 'www \' for apostrophe', 25],
  ['Images_Icons/3_MegaIcons/Icon_FlameMan.png', 'Images_Full/3_Mega/Mega_FlameMan.png', 'www \' for apostrophe', 26],
  ['Images_Icons/3_MegaIcons/Icon_Madd.png', 'Images_Full/3_Mega/Mega_Madd.png', 'www \' for apostrophe', 27],
  ['Images_Icons/3_MegaIcons/Icon_CountZap.png', 'Images_Full/3_Mega/Mega_CountZap.png', 'www \' for apostrophe', 28],
  ['Images_Icons/3_MegaIcons/Icon_Yahoot.png', 'Images_Full/3_Mega/Mega_Yahoot.png', 'www \' for apostrophe', 29],
  ['Images_Icons/3_MegaIcons/Icon_StoneMan.png', 'Images_Full/3_Mega/Mega_StoneMan.png', 'www \' for apostrophe', 30],
  ['Images_Icons/3_MegaIcons/Icon_BombMan.png', 'Images_Full/3_Mega/Mega_BombMan.png', 'www \' for apostrophe', 31],
  ['Images_Icons/3_MegaIcons/Icon_Froid.png', 'Images_Full/3_Mega/Mega_Froid.png', 'www \' for apostrophe', 32],
  ['Images_Icons/3_MegaIcons/Icon_Arashi.png', 'Images_Full/3_Mega/Mega_Arashi.png', 'www \' for apostrophe', 33],
  ['Images_Icons/3_MegaIcons/Icon_Dave.png', 'Images_Full/3_Mega/Mega_Dave.png', 'www \' for apostrophe', 34],
  ['Images_Icons/3_MegaIcons/Icon_CutMan.png', 'Images_Full/3_Mega/Mega_CutMan.png', 'www \' for apostrophe', 35],
  ['Images_Icons/3_MegaIcons/Icon_Gauss.png', 'Images_Full/3_Mega/Mega_Gauss.png', 'www \' for apostrophe', 36],
  ['Images_Icons/3_MegaIcons/Icon_Sean.png', 'Images_Full/3_Mega/Mega_Sean.png', 'www \' for apostrophe', 37],
  ['Images_Icons/3_MegaIcons/Icon_Raoul.png', 'Images_Full/3_Mega/Mega_Raoul.png', 'www \' for apostrophe', 38],
  ['Images_Icons/3_MegaIcons/Icon_Millions.png', 'Images_Full/3_Mega/Mega_Millions.png', 'www \' for apostrophe', 39],
  ['Images_Icons/3_MegaIcons/Icon_Rei.png', 'Images_Full/3_Mega/Mega_Rei.png', 'www \' for apostrophe', 40],
  ['Images_Icons/3_MegaIcons/Icon_Inukai.png', 'Images_Full/3_Mega/Mega_Inukai.png', 'www \' for apostrophe', 41],
  ['Images_Icons/3_MegaIcons/Icon_BubbleMan.png', 'Images_Full/3_Mega/Mega_BubbleMan.png', 'www \' for apostrophe', 42],
  ['Images_Icons/3_MegaIcons/Icon_Tamako.png', 'Images_Full/3_Mega/Mega_Tamako.png', 'www \' for apostrophe', 43],
  ['Images_Icons/3_MegaIcons/Icon_Tora.png', 'Images_Full/3_Mega/Mega_Tora.png', 'www \' for apostrophe', 44],
  ['Images_Icons/3_MegaIcons/Icon_Sunayama.png', 'Images_Full/3_Mega/Mega_Sunayama.png', 'www \' for apostrophe', 45],
  ['Images_Icons/3_MegaIcons/Icon_Anetta.png', 'Images_Full/3_Mega/Mega_Anetta.png', 'www \' for apostrophe', 46],
  ['Images_Icons/3_MegaIcons/Icon_MistMan.png', 'Images_Full/3_Mega/Mega_MistMan.png', 'www \' for apostrophe', 47],
  ['Images_Icons/3_MegaIcons/Icon_BowlMan.png', 'Images_Full/3_Mega/Mega_BowlMan.png', 'www \' for apostrophe', 48],
  ['Images_Icons/3_MegaIcons/Icon_DrillMan.png', 'Images_Full/3_Mega/Mega_DrillMan.png', 'www \' for apostrophe', 49],
  ['Images_Icons/3_MegaIcons/Icon_DarkMan.png', 'Images_Full/3_Mega/Mega_DarkMan.png', 'www \' for apostrophe', 50],
  ['Images_Icons/3_MegaIcons/Icon_YamatoMan.png', 'Images_Full/3_Mega/Mega_YamatoMan.png', 'www \' for apostrophe', 51],
  ['Images_Icons/3_MegaIcons/Icon_ShadeMan.png', 'Images_Full/3_Mega/Mega_ShadeMan.png', 'www \' for apostrophe', 52],
  ['Images_Icons/3_MegaIcons/Icon_Shuko.png', 'Images_Full/3_Mega/Mega_Shuko.png', 'www \' for apostrophe', 53],
  ['Images_Icons/3_MegaIcons/Icon_Terry.png', 'Images_Full/3_Mega/Mega_Terry.png', 'www \' for apostrophe', 54],
  ['Images_Icons/3_MegaIcons/Icon_TopMan.png', 'Images_Full/3_Mega/Mega_TopMan.png', 'www \' for apostrophe', 55],
  ['Images_Icons/3_MegaIcons/Icon_KiteMan.png', 'Images_Full/3_Mega/Mega_KiteMan.png', 'www \' for apostrophe', 56],
  ['Images_Icons/3_MegaIcons/Icon_Atsuki.png', 'Images_Full/3_Mega/Mega_Atsuki.png', 'www \' for apostrophe', 57],
  ['Images_Icons/3_MegaIcons/Icon_Narcy.png', 'Images_Full/3_Mega/Mega_Narcy.png', 'www \' for apostrophe', 58],
  ['Images_Icons/3_MegaIcons/Icon_Lilly.png', 'Images_Full/3_Mega/Mega_Lilly.png', 'www \' for apostrophe', 59],
  ['Images_Icons/3_MegaIcons/Icon_IvanChillski.png', 'Images_Full/3_Mega/Mega_IvanChillski.png', 'www \' for apostrophe', 60],
  ['Images_Icons/3_MegaIcons/Icon_JunkMan.png', 'Images_Full/3_Mega/Mega_JunkMan.png', 'www \' for apostrophe', 61],
  ['Images_Icons/3_MegaIcons/Icon_Regal.png', 'Images_Full/3_Mega/Mega_Regal.png', 'www \' for apostrophe', 62],
  ['Images_Icons/3_MegaIcons/Icon_Tesla.png', 'Images_Full/3_Mega/Mega_Tesla.png', 'www \' for apostrophe', 63],
  ['Images_Icons/3_MegaIcons/Icon_Charlie.png', 'Images_Full/3_Mega/Mega_Charlie.png', 'www \' for apostrophe', 64],
  ['Images_Icons/3_MegaIcons/Icon_Nenji.png', 'Images_Full/3_Mega/Mega_Nenji.png', 'www \' for apostrophe', 65],
  ['Images_Icons/3_MegaIcons/Icon_Laika.png', 'Images_Full/3_Mega/Mega_Laika.png', 'www \' for apostrophe', 66],
  ['Images_Icons/3_MegaIcons/Icon_Jasmine.png', 'Images_Full/3_Mega/Mega_Jasmine.png', 'www \' for apostrophe', 67],
  ['Images_Icons/3_MegaIcons/Icon_Pride.png', 'Images_Full/3_Mega/Mega_Pride.png', 'www \' for apostrophe', 68],
  ['Images_Icons/3_MegaIcons/Icon_Dusk.png', 'Images_Full/3_Mega/Mega_Dusk.png', 'www \' for apostrophe', 69],
  ['Images_Icons/3_MegaIcons/Icon_Dingo.png', 'Images_Full/3_Mega/Mega_Dingo.png', 'www \' for apostrophe', 70],
  ['Images_Icons/3_MegaIcons/Icon_LarkMan.png', 'Images_Full/3_Mega/Mega_LarkMan.png', 'www \' for apostrophe', 71],
  ['Images_Icons/3_MegaIcons/Icon_BlizzardMan.png', 'Images_Full/3_Mega/Mega_BlizzardMan.png', 'www \' for apostrophe', 72],
  ['Images_Icons/3_MegaIcons/Icon_CloudMan.png', 'Images_Full/3_Mega/Mega_CloudMan.png', 'www \' for apostrophe', 73],
  ['Images_Icons/3_MegaIcons/Icon_CosmoMan.png', 'Images_Full/3_Mega/Mega_CosmoMan.png', 'www \' for apostrophe', 74],
  ['Images_Icons/3_MegaIcons/Icon_Pat.png', 'Images_Full/3_Mega/Mega_Pat.png', 'www \' for apostrophe', 75],
  ['Images_Icons/3_MegaIcons/Icon_AnnZap.png', 'Images_Full/3_Mega/Mega_AnnZap.png', 'www \' for apostrophe', 76],
  ['Images_Icons/3_MegaIcons/Icon_DarkScythe.png', 'Images_Full/3_Mega/DarkScythe.png', 'www \' for apostrophe', 77],
  ['Images_Icons/3_MegaIcons/Icon_AlFerry.png', 'Images_Full/3_Mega/Mega_AlFerry.png', 'www \' for apostrophe', 78],
  ['Images_Icons/3_MegaIcons/Icon_Master.png', 'Images_Full/3_Mega/Mega_Master.png', 'www \' for apostrophe', 79],
  ['Images_Icons/3_MegaIcons/Icon_Moliarty.png', 'Images_Full/3_Mega/Mega_Moliarty.png', 'www \' for apostrophe', 80],
  ['Images_Icons/3_MegaIcons/Icon_Press.png', 'Images_Full/3_Mega/Mega_Press.png', 'www \' for apostrophe', 81],
  ['Images_Icons/3_MegaIcons/Icon_JoeMach.png', 'Images_Full/3_Mega/Mega_JoeMach.png', 'www \' for apostrophe', 82],
  ['Images_Icons/3_MegaIcons/Icon_Blackbeard.png', 'Images_Full/3_Mega/Mega_Blackbeard.png', 'www \' for apostrophe', 83],
  ['Images_Icons/3_MegaIcons/Icon_Yuika.png', 'Images_Full/3_Mega/Mega_Yuika.png', 'www \' for apostrophe', 84],
  ['Images_Icons/3_MegaIcons/Icon_Ito.png', 'Images_Full/3_Mega/Mega_Ito.png', 'www \' for apostrophe', 85],
  ['Images_Icons/3_MegaIcons/Icon_Vic.png', 'Images_Full/3_Mega/Mega_Vic.png', 'www \' for apostrophe', 86],
  ['Images_Icons/3_MegaIcons/Icon_HatMan.png', 'Images_Full/3_Mega/Mega_HatMan.png', 'www \' for apostrophe', 87],
  ['Images_Icons/3_MegaIcons/Icon_MaryTowa.png', 'Images_Full/3_Mega/Mega_MaryTowa.png', 'www \' for apostrophe', 88],
  ['Images_Icons/3_MegaIcons/Icon_Kai.png', 'Images_Full/3_Mega/Mega_Kai.png', 'www \' for apostrophe', 89],
  ['Images_Icons/3_MegaIcons/Icon_Sherrice.png', 'Images_Full/3_Mega/Mega_Sherrice.png', 'www \' for apostrophe', 90],
  ['Images_Icons/3_MegaIcons/Icon_BrightMan.png', 'Images_Full/3_Mega/Mega_BrightMan.png', 'www \' for apostrophe', 91],
  ['Images_Icons/3_MegaIcons/Icon_GravityMan.png', 'Images_Full/3_Mega/Mega_GravityMan.png', 'www \' for apostrophe', 92],
  ['Images_Icons/3_MegaIcons/Icon_NeedleMan.png', 'Images_Full/3_Mega/Mega_NeedleMan.png', 'www \' for apostrophe', 93],
  ['Images_Icons/3_MegaIcons/Icon_SwordMan.png', 'Images_Full/3_Mega/Mega_SwordMan.png', 'www \' for apostrophe', 94],
  ['Images_Icons/3_MegaIcons/Icon_StarMan.png', 'Images_Full/3_Mega/Mega_StarMan.png', 'www \' for apostrophe', 95]
]

const kiloRank = [
  ['Images_Icons/4_KiloIcons/Icon_SirProg.png', 'Images_Full/4_Kilo/Kilo_SirProg.png', 'www \' for apostrophe', 96],
  ['Images_Icons/4_KiloIcons/Icon_ProgEsq.png', 'Images_Full/4_Kilo/Kilo_ProgEsq.png', 'www \' for apostrophe', 97],
  ['Images_Icons/4_KiloIcons/Icon_NinjaProg.png', 'Images_Full/4_Kilo/Kilo_NinjaProg.png', 'www \' for apostrophe', 98],
  ['Images_Icons/4_KiloIcons/Icon_DrProg.png', 'Images_Full/4_Kilo/Kilo_DrProg.png', 'www \' for apostrophe', 99],
  ['Images_Icons/4_KiloIcons/Icon_IronFist.png', 'Images_Full/4_Kilo/Kilo_IronFist.png', 'www \' for apostrophe', 100],
  ['Images_Icons/4_KiloIcons/Icon_Jennifer.png', 'Images_Full/4_Kilo/Kilo_Jennifer.png', 'www \' for apostrophe', 101],
  ['Images_Icons/4_KiloIcons/Icon_Insectopedia.png', 'Images_Full/4_Kilo/Kilo_Insectopedia.png', 'www \' for apostrophe', 102],
  ['Images_Icons/4_KiloIcons/Icon_Guilty.png', 'Images_Full/4_Kilo/Kilo_Guilty.png', 'www \' for apostrophe', 103],
  ['Images_Icons/4_KiloIcons/Icon_Criminal.png', 'Images_Full/4_Kilo/Kilo_Criminal.png', 'www \' for apostrophe', 104],
  ['Images_Icons/4_KiloIcons/Icon_Liar.png', 'Images_Full/4_Kilo/Kilo_Liar.png', 'www \' for apostrophe', 105],
  ['Images_Icons/4_KiloIcons/Icon_Mick.png', 'Images_Full/4_Kilo/Kilo_Mick.png', 'www \' for apostrophe', 106],
  ['Images_Icons/4_KiloIcons/Icon_Tab.png', 'Images_Full/4_Kilo/Kilo_Tab.png', 'www \' for apostrophe', 107],
  ['Images_Icons/4_KiloIcons/Icon_Maylu.png', 'Images_Full/4_Kilo/Kilo_Maylu.png', 'www \' for apostrophe', 108],
  ['Images_Icons/4_KiloIcons/Icon_Yai.png', 'Images_Full/4_Kilo/Kilo_Yai.png', 'www \' for apostrophe', 109],
  ['Images_Icons/4_KiloIcons/Icon_Dex.png', 'Images_Full/4_Kilo/Kilo_Dex.png', 'www \' for apostrophe', 110],
  ['Images_Icons/4_KiloIcons/Icon_Higsby.png', 'Images_Full/4_Kilo/Kilo_Higsby.png', 'www \' for apostrophe', 111],
  ['Images_Icons/4_KiloIcons/Icon_Ribitta.png', 'Images_Full/4_Kilo/Kilo_Ribitta.png', 'www \' for apostrophe', 112],
  ['Images_Icons/4_KiloIcons/Icon_Sal.png', 'Images_Full/4_Kilo/Kilo_Sal.png', 'www \' for apostrophe', 113],
  ['Images_Icons/4_KiloIcons/Icon_Miyu.png', 'Images_Full/4_Kilo/Kilo_Miyu.png', 'www \' for apostrophe', 114],
  ['Images_Icons/4_KiloIcons/Icon_Masa.png', 'Images_Full/4_Kilo/Kilo_Masa.png', 'www \' for apostrophe', 115],
  ['Images_Icons/4_KiloIcons/Icon_GateMan.png', 'Images_Full/4_Kilo/Kilo_GateMan.png', 'www \' for apostrophe', 116],
  ['Images_Icons/4_KiloIcons/Icon_Punk.png', 'Images_Full/4_Kilo/Kilo_Punk.png', 'www \' for apostrophe', 117],
  ['Images_Icons/4_KiloIcons/Icon_KendoMan.png', 'Images_Full/4_Kilo/Kilo_KendoMan.png', 'www \' for apostrophe', 118],
  ['Images_Icons/4_KiloIcons/Icon_GridMan.png', 'Images_Full/4_Kilo/Kilo_GridMan.png', 'www \' for apostrophe', 119]
]

const standardRank = [
  ['Images_Icons/5_StandardIcons/Icon_FastEddy.png', 'Images_Full/5_Standard/Standard_FastEddy.png', 'www \' for apostrophe', 120],
  ['Images_Icons/5_StandardIcons/Icon_Candy.png', 'Images_Full/5_Standard/Standard_Candy.png', 'www \' for apostrophe', 121],
  ['Images_Icons/5_StandardIcons/Icon_Indigo.png', 'Images_Full/5_Standard/Standard_Indigo.png', 'www \' for apostrophe', 122],
  ['Images_Icons/5_StandardIcons/Icon_Pacifica.png', 'Images_Full/5_Standard/Standard_Pacifica.png', 'www \' for apostrophe', 123],
  ['Images_Icons/5_StandardIcons/Icon_John.png', 'Images_Full/5_Standard/Standard_John.png', 'www \' for apostrophe', 124],
  ['Images_Icons/5_StandardIcons/Icon_Virtue.png', 'Images_Full/5_Standard/Standard_Virtue.png', 'www \' for apostrophe', 125],
  ['Images_Icons/5_StandardIcons/Icon_Mari.png', 'Images_Full/5_Standard/Standard_Mari.png', 'www \' for apostrophe', 126],
  ['Images_Icons/5_StandardIcons/Icon_Haruka.png', 'Images_Full/5_Standard/Standard_Haruka.png', 'www \' for apostrophe', 127],
  ['Images_Icons/5_StandardIcons/Icon_Yuichiro.png', 'Images_Full/5_Standard/Standard_Yuichiro.png', 'www \' for apostrophe', 128],
  ['Images_Icons/5_StandardIcons/Icon_Prog.png', 'Images_Full/5_Standard/Standard_Prog.png', 'www \' for apostrophe', 129],
  ['Images_Icons/5_StandardIcons/Icon_ProfessorProg.png', 'Images_Full/5_Standard/Standard_ProfessorProg.png', 'www \' for apostrophe', 130],
  ['Images_Icons/5_StandardIcons/Icon_FarmerProg.png', 'Images_Full/5_Standard/Standard_FarmerProg.png', 'www \' for apostrophe', 131]
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
    document.getElementById("pullButton").innerHTML = "You need more currency!!";
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
    document.getElementById("bannerMessage").innerHTML = "Congradulations, you got " + characterName + "!!";
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
    document.getElementById("pullButton").innerHTML = "You need more currency!!";
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
    document.getElementById("pullButton").innerHTML = "You need more currency!!";
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

  // Look through the teraRank array first.
  // Note the use of x, y, and z instead of i, since i is already used by the function that calls on this one.
  // src is for the icon image, longdesc is for the full image, and alt is for the character descriptions.
  for (var x = 0; x < teraRank.length; x++) {
    if (teraRank[x][3] == character) {
      imgNode.src = teraRank[x][0];
      imgNode.longdesc = teraRank[x][1];
      imgNode.alt = teraRank[x][2];

      matchFound = true;
      break;
    }
  }

  // If no match was found, then check the gigaRank array next.
  for (var x = 0; x < gigaRank.length; x++) {
    if (gigaRank[x][3] == character) {
      imgNode.src = gigaRank[x][0];
      imgNode.longdesc = gigaRank[x][1];
      imgNode.alt = gigaRank[x][2];

      matchFound = true;
      break;
    }
  }

  // If no match was found, then check the megaRank array next.
  if (!matchFound) {
    for (var y = 0; y < megaRank.length; y++) {
      if (megaRank[y][3] == character) {
        imgNode.src = megaRank[y][0];
        imgNode.longdesc = megaRank[y][1];
        imgNode.alt = megaRank[y][2];

        matchFound = true;
        break;
      }
    }
  }

  // If still no match was found, then check the kiloRank array.
  if (!matchFound) {
    for (var z = 0; z < kiloRank.length; z++) {
      if (kiloRank[z][3] == character) {
        imgNode.src = kiloRank[z][0];
        imgNode.longdesc = kiloRank[z][1];
        imgNode.alt = kiloRank[z][2];

        matchFound = true;
        break;
      }
    }
  }

  // If still no match was found, then finally check the standardRank array.
  if (!matchFound) {
    for (var z = 0; z < standardRank.length; z++) {
      if (standardRank[z][3] == character) {
        imgNode.src = standardRank[z][0];
        imgNode.longdesc = standardRank[z][1];
        imgNode.alt = standardRank[z][2];

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
