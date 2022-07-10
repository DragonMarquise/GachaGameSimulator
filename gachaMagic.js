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
  ['Images_Icons/1_TeraIcons/Icon_Serenade.png', 'Images_Full/1_Tera/Tera_Serenade.png', 'Tera_Serenade', 1],
  ['Images_Icons/1_TeraIcons/Icon_OmegaMan.png', 'Images_Full/1_Tera/Tera_OmegaMan.png', 'Tera_OmegaMan', 2],
  ['Images_Icons/1_TeraIcons/Icon_KingProg.png', 'Images_Full/1_Tera/Tera_KingProg.png', 'Tera_KingProg', 3],
  ['Images_Icons/1_TeraIcons/Icon_Slur.png', 'Images_Full/1_Tera/Tera_Slur.png', 'Tera_Slur', 4],
  ['Images_Icons/1_TeraIcons/Icon_Cache.png', 'Images_Full/1_Tera/Tera_Cache.png', 'Tera_Cache', 5]
]

const gigaRank = [
  ['Images_Icons/2_GigaIcons/Icon_Lan.png', 'Images_Full/2_Giga/Giga_Lan.png', 'Giga_Lan', 6],
  ['Images_Icons/2_GigaIcons/Icon_Chaud.png', 'Images_Full/2_Giga/Giga_Chaud.png', 'Giga_Chaud', 7],
  ['Images_Icons/2_GigaIcons/Icon_Baryl.png', 'Images_Full/2_Giga/Giga_Baryl.png', 'Giga_Baryl', 8],
  ['Images_Icons/2_GigaIcons/Icon_Bass.png', 'Images_Full/2_Giga/Giga_Bass.png', 'Giga_Bass', 9],
  ['Images_Icons/2_GigaIcons/Icon_Zero.png', 'Images_Full/2_Giga/Giga_Zero.png', 'Giga_Zero', 10],
  ['Images_Icons/2_GigaIcons/Icon_PharaohMan.png', 'Images_Full/2_Giga/Giga_PharaohMan.png', 'Giga_PharaohMan', 11],
  ['Images_Icons/2_GigaIcons/Icon_PlanetMan.png', 'Images_Full/2_Giga/Giga_PlanetMan.png', 'Giga_PlanetMan', 12],
  ['Images_Icons/2_GigaIcons/Icon_LifeVirus.png', 'Images_Full/2_Giga/Giga_LifeVirus.png', 'Giga_LifeVirus', 13],
  ['Images_Icons/2_GigaIcons/Icon_Gospel.png', 'Images_Full/2_Giga/Giga_Gospel.png', 'Giga_Gospel', 14],
  ['Images_Icons/2_GigaIcons/Icon_Alpha.png', 'Images_Full/2_Giga/Giga_Alpha.png', 'Giga_Alpha', 15],
  ['Images_Icons/2_GigaIcons/Icon_Duo.png', 'Images_Full/2_Giga/Giga_Duo.png', 'Giga_Duo', 16],
  ['Images_Icons/2_GigaIcons/Icon_NebulaGray.png', 'Images_Full/2_Giga/Giga_NebulaGray.png', 'Giga_NebulaGray', 17],
  ['Images_Icons/2_GigaIcons/Icon_Gregar.png', 'Images_Full/2_Giga/Giga_Gregar.png', 'Giga_Gregar', 18],
  ['Images_Icons/2_GigaIcons/Icon_Falzar.png', 'Images_Full/2_Giga/Giga_Falzar.png', 'Giga_Falzar', 19],
  ['Images_Icons/2_GigaIcons/Icon_Django.png', 'Images_Full/2_Giga/Giga_Django.png', 'Giga_Django', 20],
  ['Images_Icons/2_GigaIcons/Icon_Count.png', 'Images_Full/2_Giga/Giga_Count.png', 'Giga_Count', 21],
  ['Images_Icons/2_GigaIcons/Icon_ShootingStars.png', 'Images_Full/2_Giga/Giga_ShootingStars.png', 'Giga_ShootingStars', 22],
  ['Images_Icons/2_GigaIcons/Icon_Wan.png', 'Images_Full/2_Giga/Giga_Wan.png', 'Giga_Wan', 23],
  ['Images_Icons/2_GigaIcons/Icon_Wily.png', 'Images_Full/2_Giga/Giga_Wily.png', 'Giga_Wily', 24]
]

const megaRank = [
  ['Images_Icons/3_MegaIcons/Icon_FireMan.png', 'Images_Full/3_Mega/Mega_FireMan.png', 'Mega_FireMan', 25],
  ['Images_Icons/3_MegaIcons/Icon_HeatMan.png', 'Images_Full/3_Mega/Mega_HeatMan.png', 'Mega_HeatMan', 26],
  ['Images_Icons/3_MegaIcons/Icon_FlameMan.png', 'Images_Full/3_Mega/Mega_FlameMan.png', 'Mega_FlameMan', 27],
  ['Images_Icons/3_MegaIcons/Icon_Madd.png', 'Images_Full/3_Mega/Mega_Madd.png', 'Mega_Madd', 28],
  ['Images_Icons/3_MegaIcons/Icon_CountZap.png', 'Images_Full/3_Mega/Mega_CountZap.png', 'Mega_CountZap', 29],
  ['Images_Icons/3_MegaIcons/Icon_Yahoot.png', 'Images_Full/3_Mega/Mega_Yahoot.png', 'Mega_Yahoot', 30],
  ['Images_Icons/3_MegaIcons/Icon_StoneMan.png', 'Images_Full/3_Mega/Mega_StoneMan.png', 'Mega_StoneMan', 31],
  ['Images_Icons/3_MegaIcons/Icon_BombMan.png', 'Images_Full/3_Mega/Mega_BombMan.png', 'Mega_BombMan', 32],
  ['Images_Icons/3_MegaIcons/Icon_Froid.png', 'Images_Full/3_Mega/Mega_Froid.png', 'Mega_Froid', 33],
  ['Images_Icons/3_MegaIcons/Icon_Arashi.png', 'Images_Full/3_Mega/Mega_Arashi.png', 'Mega_Arashi', 34],
  ['Images_Icons/3_MegaIcons/Icon_Dave.png', 'Images_Full/3_Mega/Mega_Dave.png', 'Mega_Dave', 35],
  ['Images_Icons/3_MegaIcons/Icon_CutMan.png', 'Images_Full/3_Mega/Mega_CutMan.png', 'Mega_CutMan', 36],
  ['Images_Icons/3_MegaIcons/Icon_Gauss.png', 'Images_Full/3_Mega/Mega_Gauss.png', 'Mega_Gauss', 37],
  ['Images_Icons/3_MegaIcons/Icon_Sean.png', 'Images_Full/3_Mega/Mega_Sean.png', 'Mega_Sean', 38],
  ['Images_Icons/3_MegaIcons/Icon_Raoul.png', 'Images_Full/3_Mega/Mega_Raoul.png', 'Mega_Raoul', 39],
  ['Images_Icons/3_MegaIcons/Icon_Millions.png', 'Images_Full/3_Mega/Mega_Millions.png', 'Mega_Millions', 40],
  ['Images_Icons/3_MegaIcons/Icon_Rei.png', 'Images_Full/3_Mega/Mega_Rei.png', 'Mega_Rei', 41],
  ['Images_Icons/3_MegaIcons/Icon_Inukai.png', 'Images_Full/3_Mega/Mega_Inukai.png', 'Mega_Inukai', 42],
  ['Images_Icons/3_MegaIcons/Icon_BubbleMan.png', 'Images_Full/3_Mega/Mega_BubbleMan.png', 'Mega_BubbleMan', 43],
  ['Images_Icons/3_MegaIcons/Icon_Tamako.png', 'Images_Full/3_Mega/Mega_Tamako.png', 'Mega_Tamako', 44],
  ['Images_Icons/3_MegaIcons/Icon_Tora.png', 'Images_Full/3_Mega/Mega_Tora.png', 'Mega_Tora', 45],
  ['Images_Icons/3_MegaIcons/Icon_Sunayama.png', 'Images_Full/3_Mega/Mega_Sunayama.png', 'Mega_Sunayama', 46],
  ['Images_Icons/3_MegaIcons/Icon_Anetta.png', 'Images_Full/3_Mega/Mega_Anetta.png', 'Mega_Anetta', 47],
  ['Images_Icons/3_MegaIcons/Icon_MistMan.png', 'Images_Full/3_Mega/Mega_MistMan.png', 'Mega_MistMan', 48],
  ['Images_Icons/3_MegaIcons/Icon_BowlMan.png', 'Images_Full/3_Mega/Mega_BowlMan.png', 'Mega_BowlMan', 49],
  ['Images_Icons/3_MegaIcons/Icon_DrillMan.png', 'Images_Full/3_Mega/Mega_DrillMan.png', 'Mega_DrillMan', 50],
  ['Images_Icons/3_MegaIcons/Icon_DarkMan.png', 'Images_Full/3_Mega/Mega_DarkMan.png', 'Mega_DarkMan', 51],
  ['Images_Icons/3_MegaIcons/Icon_YamatoMan.png', 'Images_Full/3_Mega/Mega_YamatoMan.png', 'Mega_YamatoMan', 52],
  ['Images_Icons/3_MegaIcons/Icon_ShadeMan.png', 'Images_Full/3_Mega/Mega_ShadeMan.png', 'Mega_ShadeMan', 53],
  ['Images_Icons/3_MegaIcons/Icon_Shuko.png', 'Images_Full/3_Mega/Mega_Shuko.png', 'Mega_Shuko', 54],
  ['Images_Icons/3_MegaIcons/Icon_Terry.png', 'Images_Full/3_Mega/Mega_Terry.png', 'Mega_Terry', 55],
  ['Images_Icons/3_MegaIcons/Icon_TopMan.png', 'Images_Full/3_Mega/Mega_TopMan.png', 'Mega_TopMan', 56],
  ['Images_Icons/3_MegaIcons/Icon_KiteMan.png', 'Images_Full/3_Mega/Mega_KiteMan.png', 'Mega_KiteMan', 57],
  ['Images_Icons/3_MegaIcons/Icon_Atsuki.png', 'Images_Full/3_Mega/Mega_Atsuki.png', 'Mega_Atsuki', 58],
  ['Images_Icons/3_MegaIcons/Icon_Narcy.png', 'Images_Full/3_Mega/Mega_Narcy.png', 'Mega_Narcy', 59],
  ['Images_Icons/3_MegaIcons/Icon_Lilly.png', 'Images_Full/3_Mega/Mega_Lilly.png', 'Mega_Lilly', 60],
  ['Images_Icons/3_MegaIcons/Icon_IvanChillski.png', 'Images_Full/3_Mega/Mega_IvanChillski.png', 'Mega_IvanChillski', 61],
  ['Images_Icons/3_MegaIcons/Icon_JunkMan.png', 'Images_Full/3_Mega/Mega_JunkMan.png', 'Mega_JunkMan', 62],
  ['Images_Icons/3_MegaIcons/Icon_Regal.png', 'Images_Full/3_Mega/Mega_Regal.png', 'Mega_Regal', 63],
  ['Images_Icons/3_MegaIcons/Icon_Tesla.png', 'Images_Full/3_Mega/Mega_Tesla.png', 'Mega_Tesla', 64],
  ['Images_Icons/3_MegaIcons/Icon_Charlie.png', 'Images_Full/3_Mega/Mega_Charlie.png', 'Mega_Charlie', 65],
  ['Images_Icons/3_MegaIcons/Icon_Nenji.png', 'Images_Full/3_Mega/Mega_Nenji.png', 'Mega_Nenji', 66],
  ['Images_Icons/3_MegaIcons/Icon_Raika.png', 'Images_Full/3_Mega/Mega_Raika.png', 'Mega_Raika', 67],
  ['Images_Icons/3_MegaIcons/Icon_Jasmine.png', 'Images_Full/3_Mega/Mega_Jasmine.png', 'Mega_Jasmine', 68],
  ['Images_Icons/3_MegaIcons/Icon_Pride.png', 'Images_Full/3_Mega/Mega_Pride.png', 'Mega_Pride', 69],
  ['Images_Icons/3_MegaIcons/Icon_Dusk.png', 'Images_Full/3_Mega/Mega_Dusk.png', 'Mega_Dusk', 70],
  ['Images_Icons/3_MegaIcons/Icon_Dingo.png', 'Images_Full/3_Mega/Mega_Dingo.png', 'Mega_Dingo', 71],
  ['Images_Icons/3_MegaIcons/Icon_LarkMan.png', 'Images_Full/3_Mega/Mega_LarkMan.png', 'Mega_LarkMan', 72],
  ['Images_Icons/3_MegaIcons/Icon_BlizzardMan.png', 'Images_Full/3_Mega/Mega_BlizzardMan.png', 'Mega_BlizzardMan', 73],
  ['Images_Icons/3_MegaIcons/Icon_CloudMan.png', 'Images_Full/3_Mega/Mega_CloudMan.png', 'Mega_CloudMan', 74],
  ['Images_Icons/3_MegaIcons/Icon_CosmoMan.png', 'Images_Full/3_Mega/Mega_CosmoMan.png', 'Mega_CosmoMan', 75],
  ['Images_Icons/3_MegaIcons/Icon_Pat.png', 'Images_Full/3_Mega/Mega_Pat.png', 'Mega_Pat', 76],
  ['Images_Icons/3_MegaIcons/Icon_AnnZap.png', 'Images_Full/3_Mega/Mega_AnnZap.png', 'Mega_AnnZap', 77],
  ['Images_Icons/3_MegaIcons/Icon_DarkScythe.png', 'Images_Full/3_Mega/Mega_DarkScythe.png', 'Mega_DarkScythe', 78],
  ['Images_Icons/3_MegaIcons/Icon_AlFerry.png', 'Images_Full/3_Mega/Mega_AlFerry.png', 'Mega_AlFerry', 79],
  ['Images_Icons/3_MegaIcons/Icon_Master.png', 'Images_Full/3_Mega/Mega_Master.png', 'Mega_Master', 80],
  ['Images_Icons/3_MegaIcons/Icon_Moliarty.png', 'Images_Full/3_Mega/Mega_Moliarty.png', 'Mega_Moliarty', 81],
  ['Images_Icons/3_MegaIcons/Icon_Press.png', 'Images_Full/3_Mega/Mega_Press.png', 'Mega_Press', 82],
  ['Images_Icons/3_MegaIcons/Icon_JoeMach.png', 'Images_Full/3_Mega/Mega_JoeMach.png', 'Mega_JoeMach', 83],
  ['Images_Icons/3_MegaIcons/Icon_Blackbeard.png', 'Images_Full/3_Mega/Mega_Blackbeard.png', 'Mega_Blackbeard', 84],
  ['Images_Icons/3_MegaIcons/Icon_Yuika.png', 'Images_Full/3_Mega/Mega_Yuika.png', 'Mega_Yuika', 85],
  ['Images_Icons/3_MegaIcons/Icon_Ito.png', 'Images_Full/3_Mega/Mega_Ito.png', 'Mega_Ito', 86],
  ['Images_Icons/3_MegaIcons/Icon_Vic.png', 'Images_Full/3_Mega/Mega_Vic.png', 'Mega_Vic', 87],
  ['Images_Icons/3_MegaIcons/Icon_HatMan.png', 'Images_Full/3_Mega/Mega_HatMan.png', 'Mega_HatMan', 88],
  ['Images_Icons/3_MegaIcons/Icon_MaryTowa.png', 'Images_Full/3_Mega/Mega_MaryTowa.png', 'Mega_MaryTowa', 89],
  ['Images_Icons/3_MegaIcons/Icon_Kai.png', 'Images_Full/3_Mega/Mega_Kai.png', 'Mega_Kai', 90],
  ['Images_Icons/3_MegaIcons/Icon_Sherrice.png', 'Images_Full/3_Mega/Mega_Sherrice.png', 'Mega_Sherrice', 91],
  ['Images_Icons/3_MegaIcons/Icon_BrightMan.png', 'Images_Full/3_Mega/Mega_BrightMan.png', 'Mega_BrightMan', 92],
  ['Images_Icons/3_MegaIcons/Icon_GravityMan.png', 'Images_Full/3_Mega/Mega_GravityMan.png', 'Mega_GravityMan', 93],
  ['Images_Icons/3_MegaIcons/Icon_NeedleMan.png', 'Images_Full/3_Mega/Mega_NeedleMan.png', 'Mega_NeedleMan', 94],
  ['Images_Icons/3_MegaIcons/Icon_SwordMan.png', 'Images_Full/3_Mega/Mega_SwordMan.png', 'Mega_SwordMan', 95],
  ['Images_Icons/3_MegaIcons/Icon_StarMan.png', 'Images_Full/3_Mega/Mega_StarMan.png', 'Mega_StarMan', 96],
  ['Images_Icons/3_MegaIcons/Icon_Professor.png', 'Images_Full/3_Mega/Mega_Professor.png', 'Mega_Professor', 97]
]

const kiloRank = [
  ['Images_Icons/4_KiloIcons/Icon_SirProg.png', 'Images_Full/4_Kilo/Kilo_SirProg.png', 'Kilo_SirProg', 98],
  ['Images_Icons/4_KiloIcons/Icon_ProgEsq.png', 'Images_Full/4_Kilo/Kilo_ProgEsq.png', 'Kilo_ProgEsq', 99],
  ['Images_Icons/4_KiloIcons/Icon_NinjaProg.png', 'Images_Full/4_Kilo/Kilo_NinjaProg.png', 'Kilo_NinjaProg', 100],
  ['Images_Icons/4_KiloIcons/Icon_DrProg.png', 'Images_Full/4_Kilo/Kilo_DrProg.png', 'Kilo_DrProg', 101],
  ['Images_Icons/4_KiloIcons/Icon_IronFist.png', 'Images_Full/4_Kilo/Kilo_IronFist.png', 'Kilo_IronFist', 102],
  ['Images_Icons/4_KiloIcons/Icon_Jennifer.png', 'Images_Full/4_Kilo/Kilo_Jennifer.png', 'Kilo_Jennifer', 103],
  ['Images_Icons/4_KiloIcons/Icon_Insectopedia.png', 'Images_Full/4_Kilo/Kilo_Insectopedia.png', 'Kilo_Insectopedia', 104],
  ['Images_Icons/4_KiloIcons/Icon_Guilty.png', 'Images_Full/4_Kilo/Kilo_Guilty.png', 'Kilo_Guilty', 105],
  ['Images_Icons/4_KiloIcons/Icon_Criminal.png', 'Images_Full/4_Kilo/Kilo_Criminal.png', 'Kilo_Criminal', 106],
  ['Images_Icons/4_KiloIcons/Icon_Liar.png', 'Images_Full/4_Kilo/Kilo_Liar.png', 'Kilo_Liar', 107],
  ['Images_Icons/4_KiloIcons/Icon_Mick.png', 'Images_Full/4_Kilo/Kilo_Mick.png', 'Kilo_Mick', 108],
  ['Images_Icons/4_KiloIcons/Icon_Tab.png', 'Images_Full/4_Kilo/Kilo_Tab.png', 'Kilo_Tab', 109],
  ['Images_Icons/4_KiloIcons/Icon_Maylu.png', 'Images_Full/4_Kilo/Kilo_Maylu.png', 'Kilo_Maylu', 110],
  ['Images_Icons/4_KiloIcons/Icon_Yai.png', 'Images_Full/4_Kilo/Kilo_Yai.png', 'Kilo_Yai', 111],
  ['Images_Icons/4_KiloIcons/Icon_Dex.png', 'Images_Full/4_Kilo/Kilo_Dex.png', 'Kilo_Dex', 112],
  ['Images_Icons/4_KiloIcons/Icon_Higsby.png', 'Images_Full/4_Kilo/Kilo_Higsby.png', 'Kilo_Higsby', 113],
  ['Images_Icons/4_KiloIcons/Icon_Ribitta.png', 'Images_Full/4_Kilo/Kilo_Ribitta.png', 'Kilo_Ribitta', 114],
  ['Images_Icons/4_KiloIcons/Icon_Sal.png', 'Images_Full/4_Kilo/Kilo_Sal.png', 'Kilo_Sal', 115],
  ['Images_Icons/4_KiloIcons/Icon_Miyu.png', 'Images_Full/4_Kilo/Kilo_Miyu.png', 'Kilo_Miyu', 116],
  ['Images_Icons/4_KiloIcons/Icon_Masa.png', 'Images_Full/4_Kilo/Kilo_Masa.png', 'Kilo_Masa', 117],
  ['Images_Icons/4_KiloIcons/Icon_GateMan.png', 'Images_Full/4_Kilo/Kilo_GateMan.png', 'Kilo_GateMan', 118],
  ['Images_Icons/4_KiloIcons/Icon_Punk.png', 'Images_Full/4_Kilo/Kilo_Punk.png', 'Kilo_Punk', 119],
  ['Images_Icons/4_KiloIcons/Icon_KendoMan.png', 'Images_Full/4_Kilo/Kilo_KendoMan.png', 'Kilo_KendoMan', 120],
  ['Images_Icons/4_KiloIcons/Icon_GridMan.png', 'Images_Full/4_Kilo/Kilo_GridMan.png', 'Kilo_GridMan', 121],
  ['Images_Icons/4_KiloIcons/Icon_Iris.png', 'Images_Full/4_Kilo/Kilo_Iris.png', 'Kilo_Iris', 122]
]

const standardRank = [
  ['Images_Icons/5_StandardIcons/Icon_FastEddy.png', 'Images_Full/5_Standard/Standard_FastEddy.png', 'Standard_FastEddy', 123],
  ['Images_Icons/5_StandardIcons/Icon_Candy.png', 'Images_Full/5_Standard/Standard_Candy.png', 'Standard_Candy', 124],
  ['Images_Icons/5_StandardIcons/Icon_Indigo.png', 'Images_Full/5_Standard/Standard_Indigo.png', 'Standard_Indigo', 125],
  ['Images_Icons/5_StandardIcons/Icon_Pacifica.png', 'Images_Full/5_Standard/Standard_Pacifica.png', 'Standard_Pacifica', 126],
  ['Images_Icons/5_StandardIcons/Icon_John.png', 'Images_Full/5_Standard/Standard_John.png', 'Standard_John', 127],
  ['Images_Icons/5_StandardIcons/Icon_Virtue.png', 'Images_Full/5_Standard/Standard_Virtue.png', 'Standard_Virtue', 128],
  ['Images_Icons/5_StandardIcons/Icon_Mari.png', 'Images_Full/5_Standard/Standard_Mari.png', 'Standard_Mari', 129],
  ['Images_Icons/5_StandardIcons/Icon_Haruka.png', 'Images_Full/5_Standard/Standard_Haruka.png', 'Standard_Haruka', 130],
  ['Images_Icons/5_StandardIcons/Icon_Yuichiro.png', 'Images_Full/5_Standard/Standard_Yuichiro.png', 'Standard_Yuichiro', 131],
  ['Images_Icons/5_StandardIcons/Icon_Prog.png', 'Images_Full/5_Standard/Standard_Prog.png', 'Standard_Prog', 132],
  ['Images_Icons/5_StandardIcons/Icon_ProfessorProg.png', 'Images_Full/5_Standard/Standard_ProfessorProg.png', 'Standard_ProfessorProg', 133],
  ['Images_Icons/5_StandardIcons/Icon_FarmerProg.png', 'Images_Full/5_Standard/Standard_FarmerProg.png', 'Standard_FarmerProg', 134]
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
      returnArray = [1,6,7,38,68,71,90,89,108,109,110,111,112,122];
      break;
    case 1:
      // World Three members (BN1, BN3, and BN6)
      returnArray = [8,10,11,12,24,25,27,28,29,30,31,32,41,42,43,46,47,50,83,84,85,86,87,96,97,113];
      break;
      case 2:
      // Gospel members (BN2)
      returnArray = [34,35,36,37,38,69];
      break;
    case 3:
      // Nebula members (BN4 and BN5)
      returnArray = [23,53,63,73,74,75,107];
      break;
    case 4:
      // Team Colonel members
      returnArray = [8,69,70,71,113,114];
      break;
    case 5:
      // Team ProtoMan members
      returnArray = [7,64,65,66,67,68];
      break;
    case 6:
      // Characters that first appeared in BN1
      returnArray = [6,7,9,11,13,24,25,28,29,30,31,32,33,110,111,113,114,115,116,117,129,130,131,132];
      break;
    case 7:
      // Characters that first appeared in BN2
      returnArray = [12,14,26,34,35,36,37,38,39,40,69,70,102,103,104,114,118];
      break;
    case 8:
      // Characters that first appeared in BN3
      returnArray = [1,15,27,41,42,43,44,45,46,47,48,49,50,51,52,119];
      break;
    case 9:
      // Characters that first appeared in BN4
      returnArray = [16,53,54,55,56,57,58,59,60,61,62,63,67,120];
      break;
    case 10:
      // Characters that first appeared in BN5
      returnArray = [8,17,64,65,66,68,71,72,73,74,75,100,107,121];
      break;
    case 11:
      // Characters that first appeared in BN6
      returnArray = [18,19,76,77,78,79,80,81,82,83,84,85,86,87,108,109,122];
      break;
    case 12:
      // Side game/anime characters
      returnArray = [4,5,10,88,89,90,91,92,93,94,95,96,97];
      break;
    case 13:
      // "A Step into the Future" costumes
      returnArray = [
        ['Images_Icons/Costumes/Icon_FutureMamoru.png', 'Images_Full/Costumes/Tera_FutureMamoru.png', 'FutureMamoru', 135],
        ['Images_Icons/Costumes/Icon_FutureLan.png', 'Images_Full/Costumes/Giga_FutureLan.png', 'FutureLan', 136],
        ['Images_Icons/Costumes/Icon_FutureChaud.png', 'Images_Full/Costumes/Giga_FutureChaud.png', 'FutureChaud', 137],
        ['Images_Icons/Costumes/Icon_FutureSean.png', 'Images_Full/Costumes/Mega_FutureSean.png', 'FutureSean', 138],
        ['Images_Icons/Costumes/Icon_FutureMick.png', 'Images_Full/Costumes/Kilo_FutureMick.png', 'FutureMick', 139],
        ['Images_Icons/Costumes/Icon_FutureTab.png', 'Images_Full/Costumes/Kilo_FutureTab.png', 'FutureTab', 140],
        ['Images_Icons/Costumes/Icon_FutureMaylu.png', 'Images_Full/Costumes/Kilo_FutureMaylu.png', 'FutureMaylu', 141],
        ['Images_Icons/Costumes/Icon_FutureYai.png', 'Images_Full/Costumes/Kilo_FutureYai.png', 'FutureYai', 142],
        ['Images_Icons/Costumes/Icon_FutureDex.png', 'Images_Full/Costumes/Kilo_FutureDex.png', 'FutureDex', 143],
        ['Images_Icons/Costumes/Icon_FutureAnetta.png', 'Images_Full/Costumes/Mega_FutureAnetta.png', 'FutureAnetta', 144]
      ];
      break;
    case 14:
      // "A Step into the Past" costumes
      returnArray = [
        ['Images_Icons/Costumes/Icon_PastMatch.png', 'Images_Full/Costumes/Mega_PastMatch.png', 'PastMatch', 145],
        ['Images_Icons/Costumes/Icon_PastMadd.png', 'Images_Full/Costumes/Mega_PastMadd.png', 'PastMadd', 146],
        ['Images_Icons/Costumes/Icon_PastCountZap.png', 'Images_Full/Costumes/Mega_PastCountZap.png', 'PastCountZap', 147],
        ['Images_Icons/Costumes/Icon_PastYahoot.png', 'Images_Full/Costumes/Mega_PastYahoot.png', 'PastYahoot', 148],
        ['Images_Icons/Costumes/Icon_PastYuichiro.png', 'Images_Full/Costumes/Standard_PastYuichiro.png', 'PastYuichiro', 149],
        ['Images_Icons/Costumes/Icon_PastHaruka.png', 'Images_Full/Costumes/Standard_PastHaruka.png', 'PastHaruka', 150],
        ['Images_Icons/Costumes/Icon_PastWily.png', 'Images_Full/Costumes/Giga_PastWily.png', 'PastWily', 151],
        ['Images_Icons/Costumes/Icon_PastLan.png', 'Images_Full/Costumes/Giga_PastLan.png', 'PastLan', 152],
        ['Images_Icons/Costumes/Icon_PastBass.png', 'Images_Full/Costumes/Giga_PastBass.png', 'PastBass', 153],
        ['Images_Icons/Costumes/Icon_PastTamako.png', 'Images_Full/Costumes/Mega_PastTamako.png', 'PastTamako', 154]
      ];
      break;
    case 15:
      // "New Years" costumes
      returnArray = [
        ['Images_Icons/Costumes/Icon_NewYearsMatch.png', 'Images_Full/Costumes/Mega_NewYearsMatch.png', 'NewYearsMatch', 155],
        ['Images_Icons/Costumes/Icon_NewYearsMadd.png', 'Images_Full/Costumes/Mega_NewYearsMadd.png', 'NewYearsMadd', 156],
        ['Images_Icons/Costumes/Icon_NewYearsCountZap.png', 'Images_Full/Costumes/Mega_NewYearsCountZap.png', 'NewYearsCountZap', 157],
        ['Images_Icons/Costumes/Icon_NewYearsYahoot.png', 'Images_Full/Costumes/Mega_NewYearsYahoot.png', 'NewYearsYahoot', 158],
        ['Images_Icons/Costumes/Icon_NewYearsTab.png', 'Images_Full/Costumes/Kilo_NewYearsTab.png', 'NewYearsTab', 159],
        ['Images_Icons/Costumes/Icon_NewYearsKai.png', 'Images_Full/Costumes/Mega_NewYearsKai.png', 'NewYearsKai', 160],
        ['Images_Icons/Costumes/Icon_NewYearsTora.png', 'Images_Full/Costumes/Mega_NewYearsTora.png', 'NewYearsTora', 161],
        ['Images_Icons/Costumes/Icon_NewYearsLilly.png', 'Images_Full/Costumes/Mega_NewYearsLilly.png', 'NewYearsLilly', 162],
        ['Images_Icons/Costumes/Icon_NewYearsJunkMan.png', 'Images_Full/Costumes/Mega_NewYearsJunkMan.png', 'NewYearsJunkMan', 163],
        ['Images_Icons/Costumes/Icon_NewYearsRaoul.png', 'Images_Full/Costumes/Mega_NewYearsRaoul.png', 'NewYearsRaoul', 164]
      ];
      break;
    case 16:
      // "Valentines" costumes
      returnArray = [
        ['Images_Icons/Costumes/Icon_ValentinesMatch.png', 'Images_Full/Costumes/Mega_ValentinesMatch.png', 'ValentinesMatch', 165],
        ['Images_Icons/Costumes/Icon_ValentinesMadd.png', 'Images_Full/Costumes/Mega_ValentinesMadd.png', 'ValentinesMadd', 166],
        ['Images_Icons/Costumes/Icon_ValentinesCountZap.png', 'Images_Full/Costumes/Mega_ValentinesCountZap.png', 'ValentinesCountZap', 167],
        ['Images_Icons/Costumes/Icon_ValentinesYahoot.png', 'Images_Full/Costumes/Mega_ValentinesYahoot.png', 'ValentinesYahoot', 168],
        ['Images_Icons/Costumes/Icon_ValentinesChaud.png', 'Images_Full/Costumes/Giga_ValentinesChaud.png', 'ValentinesChaud', 169],
        ['Images_Icons/Costumes/Icon_ValentinesMaryTowa.png', 'Images_Full/Costumes/Mega_ValentinesMaryTowa.png', 'ValentinesMaryTowa', 170],
        ['Images_Icons/Costumes/Icon_ValentinesMaylu.png', 'Images_Full/Costumes/Kilo_ValentinesMaylu.png', 'ValentinesMaylu', 171],
        ['Images_Icons/Costumes/Icon_ValentinesCharlie.png', 'Images_Full/Costumes/Mega_ValentinesCharlie.png', 'ValentinesCharlie', 172],
        ['Images_Icons/Costumes/Icon_ValentinesMillions.png', 'Images_Full/Costumes/Mega_ValentinesMillions.png', 'ValentinesMillions', 173],
        ['Images_Icons/Costumes/Icon_ValentinesYuika.png', 'Images_Full/Costumes/Mega_ValentinesYuika.png', 'ValentinesYuika', 174]
      ];
      break;
    case 17:
      // "Easter" costumes
      returnArray = [
        ['Images_Icons/Costumes/Icon_EasterMatch.png', 'Images_Full/Costumes/Mega_EasterMatch.png', 'EasterMatch', 175],
        ['Images_Icons/Costumes/Icon_EasterMadd.png', 'Images_Full/Costumes/Mega_EasterMadd.png', 'EasterMadd', 176],
        ['Images_Icons/Costumes/Icon_EasterCountZap.png', 'Images_Full/Costumes/Mega_EasterCountZap.png', 'EasterCountZap', 177],
        ['Images_Icons/Costumes/Icon_EasterYahoot.png', 'Images_Full/Costumes/Mega_EasterYahoot.png', 'EasterYahoot', 178],
        ['Images_Icons/Costumes/Icon_EasterShuko.png', 'Images_Full/Costumes/Mega_EasterShuko.png', 'EasterShuko', 179],
        ['Images_Icons/Costumes/Icon_EasterAlFerry.png', 'Images_Full/Costumes/Mega_EasterAlFerry.png', 'EasterAlFerry', 180],
        ['Images_Icons/Costumes/Icon_EasterMoliarty.png', 'Images_Full/Costumes/Mega_EasterMoliarty.png', 'EasterMoliarty', 181],
        ['Images_Icons/Costumes/Icon_EasterNarcy.png', 'Images_Full/Costumes/Mega_EasterNarcy.png', 'EasterNarcy', 182],
        ['Images_Icons/Costumes/Icon_EasterArashi.png', 'Images_Full/Costumes/Mega_EasterArashi.png', 'EasterArashi', 183],
        ['Images_Icons/Costumes/Icon_EasterBowlMan.png', 'Images_Full/Costumes/Mega_EasterBowlMan.png', 'EasterBowlMan', 184]
      ];
      break;
    case 18:
      // "Fireworks Festival" costumes
      returnArray = [
        ['Images_Icons/Costumes/Icon_FireworksMatch.png', 'Images_Full/Costumes/Mega_FireworksMatch.png', 'FireworksMatch', 185],
        ['Images_Icons/Costumes/Icon_FireworksMadd.png', 'Images_Full/Costumes/Mega_FireworksMadd.png', 'FireworksMadd', 186],
        ['Images_Icons/Costumes/Icon_FireworksCountZap.png', 'Images_Full/Costumes/Mega_FireworksCountZap.png', 'FireworksCountZap', 187],
        ['Images_Icons/Costumes/Icon_FireworksYahoot.png', 'Images_Full/Costumes/Mega_FireworksYahoot.png', 'FireworksYahoot', 188],
        ['Images_Icons/Costumes/Icon_FireworksNenji.png', 'Images_Full/Costumes/Mega_FireworksNenji.png', 'FireworksNenji', 189],
        ['Images_Icons/Costumes/Icon_FireworksHigsby.png', 'Images_Full/Costumes/Mega_FireworksHigsby.png', 'FireworksHigsby', 190],
        ['Images_Icons/Costumes/Icon_FireworksDingo.png', 'Images_Full/Costumes/Mega_FireworksDingo.png', 'FireworksDingo', 191],
        ['Images_Icons/Costumes/Icon_FireworksStarMan.png', 'Images_Full/Costumes/Mega_FireworksStarMan.png', 'FireworksStarMan', 192],
        ['Images_Icons/Costumes/Icon_FireworksAtsuki.png', 'Images_Full/Costumes/Mega_FireworksAtsuki.png', 'FireworksAtsuki', 193],
        ['Images_Icons/Costumes/Icon_FireworksBombMan.png', 'Images_Full/Costumes/Mega_FireworksBombMan.png', 'FireworksBombMan', 194]
      ];
      break;
    case 19:
      // "Harvest Moon" costumes
      returnArray = [
        ['Images_Icons/Costumes/Icon_HarvestMatch.png', 'Images_Full/Costumes/Mega_HarvestMatch.png', 'HarvestMatch', 195],
        ['Images_Icons/Costumes/Icon_HarvestMadd.png', 'Images_Full/Costumes/Mega_HarvestMadd.png', 'HarvestMadd', 196],
        ['Images_Icons/Costumes/Icon_HarvestCountZap.png', 'Images_Full/Costumes/Mega_HarvestCountZap.png', 'HarvestCountZap', 197],
        ['Images_Icons/Costumes/Icon_HarvestYahoot.png', 'Images_Full/Costumes/Mega_HarvestYahoot.png', 'HarvestYahoot', 198],
        ['Images_Icons/Costumes/Icon_HarvestDex.png', 'Images_Full/Costumes/Kilo_HarvestDex.png', 'HarvestDex', 199],
        ['Images_Icons/Costumes/Icon_HarvestRei.png', 'Images_Full/Costumes/Mega_HarvestRei.png', 'HarvestRei', 200],
        ['Images_Icons/Costumes/Icon_HarvestPat.png', 'Images_Full/Costumes/Mega_HarvestPat.png', 'HarvestPat', 201],
        ['Images_Icons/Costumes/Icon_HarvestPress.png', 'Images_Full/Costumes/Mega_HarvestPress.png', 'HarvestPress', 202],
        ['Images_Icons/Costumes/Icon_HarvestMistMan.png', 'Images_Full/Costumes/Mega_HarvestMistMan.png', 'HarvestMistMan', 203],
        ['Images_Icons/Costumes/Icon_HarvestYamatoMan.png', 'Images_Full/Costumes/Mega_HarvestYamatoMan.png', 'HarvestYamatoMan', 204]
      ];
      break;
    case 20:
      // "Halloween" costumes
      returnArray = [
        ['Images_Icons/Costumes/Icon_HalloweenMatch.png', 'Images_Full/Costumes/Mega_HalloweenMatch.png', 'HalloweenMatch', 205],
        ['Images_Icons/Costumes/Icon_HalloweenMadd.png', 'Images_Full/Costumes/Mega_HalloweenMadd.png', 'HalloweenMadd', 206],
        ['Images_Icons/Costumes/Icon_HalloweenCountZap.png', 'Images_Full/Costumes/Mega_HalloweenCountZap.png', 'HalloweenCountZap', 207],
        ['Images_Icons/Costumes/Icon_HalloweenYahoot.png', 'Images_Full/Costumes/Mega_HalloweenYahoot.png', 'HalloweenYahoot', 208],
        ['Images_Icons/Costumes/Icon_HalloweenRaika.png', 'Images_Full/Costumes/Mega_HalloweenRaika.png', 'HalloweenRaika', 209],
        ['Images_Icons/Costumes/Icon_HalloweenLan.png', 'Images_Full/Costumes/Giga_HalloweenLan.png', 'HalloweenLan', 210],
        ['Images_Icons/Costumes/Icon_HalloweenPlanetMan.png', 'Images_Full/Costumes/Giga_HalloweenPlanetMan.png', 'HalloweenPlanetMan', 211],
        ['Images_Icons/Costumes/Icon_HalloweenShadeMan.png', 'Images_Full/Costumes/Mega_HalloweenShadeMan.png', 'HalloweenShadeMan', 212],
        ['Images_Icons/Costumes/Icon_HalloweenDarkMan.png', 'Images_Full/Costumes/Mega_HalloweenDarkMan.png', 'HalloweenDarkMan', 213],
        ['Images_Icons/Costumes/Icon_HalloweenDarkScythe.png', 'Images_Full/Costumes/Mega_HalloweenDarkScythe.png', 'HalloweenDarkScythe', 214]
      ];
      break;
    case 21:
      // "Christmas" costumes
      returnArray = [
        ['Images_Icons/Costumes/Icon_ChristmasMatch.png', 'Images_Full/Costumes/Mega_ChristmasMatch.png', 'ChristmasMatch', 215],
        ['Images_Icons/Costumes/Icon_ChristmasMadd.png', 'Images_Full/Costumes/Mega_ChristmasMadd.png', 'ChristmasMadd', 216],
        ['Images_Icons/Costumes/Icon_ChristmasCountZap.png', 'Images_Full/Costumes/Mega_ChristmasCountZap.png', 'ChristmasCountZap', 217],
        ['Images_Icons/Costumes/Icon_ChristmasYahoot.png', 'Images_Full/Costumes/Mega_ChristmasYahootChristmasYahoot.png', 'ChristmasYahoot', 218],
        ['Images_Icons/Costumes/Icon_ChristmasMamoru.png', 'Images_Full/Costumes/Tera_ChristmasMamoru.png', 'ChristmasMamoru', 219],
        ['Images_Icons/Costumes/Icon_ChristmasInukai.png', 'Images_Full/Costumes/Mega_ChristmasInukai.png', 'ChristmasInukai', 220],
        ['Images_Icons/Costumes/Icon_ChristmasJasmine.png', 'Images_Full/Costumes/Mega_ChristmasJasmine.png', 'ChristmasJasmine', 221],
        ['Images_Icons/Costumes/Icon_ChristmasSal.png', 'Images_Full/Costumes/Mega_ChristmasSal.png', 'ChristmasSal', 222],
        ['Images_Icons/Costumes/Icon_ChristmasMick.png', 'Images_Full/Costumes/Kilo_ChristmasMick.png', 'ChristmasMick', 223],
        ['Images_Icons/Costumes/Icon_ChristmasLarkMan.png', 'Images_Full/Costumes/Mega_ChristmasLarkMan.png', 'ChristmasLarkMan', 224]
      ];
      break;
    case 22:
      // "Hot Summer Fun" costumes
      returnArray = [
        ['Images_Icons/Costumes/Icon_SummerMatch.png', 'Images_Full/Costumes/Mega_SummerMatch.png', 'SummerMatch', 225],
        ['Images_Icons/Costumes/Icon_SummerMadd.png', 'Images_Full/Costumes/Mega_SummerMadd.png', 'SummerMadd', 226],
        ['Images_Icons/Costumes/Icon_SummerCountZap.png', 'Images_Full/Costumes/Mega_SummerCountZap.png', 'SummerCountZap', 227],
        ['Images_Icons/Costumes/Icon_SummerYahoot.png', 'Images_Full/Costumes/Mega_SummerYahoot.png', 'SummerYahoot', 228],
        ['Images_Icons/Costumes/Icon_SummerSunayama.png', 'Images_Full/Costumes/Mega_SummerSunayama.png', 'SummerSunayama', 229],
        ['Images_Icons/Costumes/Icon_SummerYai.png', 'Images_Full/Costumes/Kilo_SummerYai.png', 'SummerYai', 230],
        ['Images_Icons/Costumes/Icon_SummerTesla.png', 'Images_Full/Costumes/Mega_SummerTesla.png', 'SummerTesla', 231],
        ['Images_Icons/Costumes/Icon_SummerBlackbeard.png', 'Images_Full/Costumes/Mega_SummerBlackbeard.png', 'SummerBlackbeard', 232],
        ['Images_Icons/Costumes/Icon_SummerTerry.png', 'Images_Full/Costumes/Mega_SummerTerry.png', 'SummerTerry', 233],
        ['Images_Icons/Costumes/Icon_SummerVic.png', 'Images_Full/Costumes/Mega_SummerVic.png', 'SummerVic', 234]
      ];
      break;
    case 23:
      // "Cold Winter Time" costumes
      returnArray = [
        ['Images_Icons/Costumes/Icon_WinterMatch.png', 'Images_Full/Costumes/Mega_WinterMatch.png', 'WinterMatch', 235],
        ['Images_Icons/Costumes/Icon_WinterMadd.png', 'Images_Full/Costumes/Mega_WinterMadd.png', 'WinterMadd', 236],
        ['Images_Icons/Costumes/Icon_WinterCountZap.png', 'Images_Full/Costumes/Mega_WinterCountZap.png', 'WinterCountZap', 237],
        ['Images_Icons/Costumes/Icon_WinterYahoot.png', 'Images_Full/Costumes/Mega_WinterYahoot.png', 'WinterYahoot', 238],
        ['Images_Icons/Costumes/Icon_WinterIvanChillski.png', 'Images_Full/Costumes/Mega_WinterIvanChillski.png', 'WinterIvanChillski', 239],
        ['Images_Icons/Costumes/Icon_WinterBlizzardMan.png', 'Images_Full/Costumes/Mega_WinterBlizzardMan.png', 'WinterBlizzardMan', 240],
        ['Images_Icons/Costumes/Icon_WinterFroid.png', 'Images_Full/Costumes/Mega_WinterFroid.png', 'WinterFroid', 241],
        ['Images_Icons/Costumes/Icon_WinterBaryl.png', 'Images_Full/Costumes/Giga_WinterBaryl.png', 'WinterBaryl', 242],
        ['Images_Icons/Costumes/Icon_WinterPharaohMan.png', 'Images_Full/Costumes/Giga_WinterPharaohMan.png', 'WinterPharaohMan', 243],
        ['Images_Icons/Costumes/Icon_WinterPride.png', 'Images_Full/Costumes/Mega_WinterPride.png', 'WinterPride', 244]
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
