const wmFeatureDefault = "Wild Magic Surge";
const wmToCFeatureDefault = "Tides of Chaos";
const wmSurgeTableDefault = "Wild-Magic-Surge-Table";

Hooks.on('init', () => {
  game.settings.register("dnd5e-helpers", "gridTemplateScaling", {
    name: "Auto adjust templates to 5e grids",
    hint: "Lines and cones will have their length scaled. Circles will be converted to an equivalent area rectangle. This seeks to match 5e grid distance when diagonal measurements are involved in template placement.",
    scope: "world",
    config: true,
    default: 0,
    type: Number,
    choices: {
      0: "No Template Scaling",
      1: "Lines and Cones",
      2: "Circles",
      3: "All Templates"
    }
  });

   /** report cover value to chat on target */
  game.settings.register("dnd5e-helpers", "losOnTarget", {
    name: "Compute cover on target",
    hint: "Enables or disables this feature globally (includes tile cover config option).",
    scope: "world",
    config: true,
    default: 0,
    type: Number,
    choices: {
      0: "Disabled",
      1: "Center Point Vision (Foundry Vision)",
      2: "Four Corner Vision (DMG pg. 251)",
    }
  });

  game.settings.register("dnd5e-helpers", "losWithTokens", {
    name: "Consider intervening tokens as half cover",
    hint: "Unchecked results in tokens not being considered for cover calculation.",
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
  });
  
  /** should surges be tested */
  game.settings.register("dnd5e-helpers", "wmOptions", {
    name: "Wild Magic Auto-Detect",
    hint: "Enables or disables auto detection of Wild Magic and how it should be handled. Standard (PHB): as seen on PHB pg. 103. More: surges on d20 <= spell level and recharges Tides of Chaos. Volatile: Similar to More, but adds 1d4 to the spell level if Tides of Chaos has been expended.",
    scope: "world",
    config: true,
    default: 0,
    type: Number,
    choices: {
      0: "Disabled",
      1: "Enabled - Standard (PHB)",
      2: "Enabled - More",
      3: "Enabled - Volatile"
    }
  });  

  /** name of the feature to trigger on */
  game.settings.register("dnd5e-helpers", "wmFeatureName", {
    name: "Wild Magic Feature Name",
    hint: "Name of feature that represents the Sorcerer's Wild Magic Surge (default: Wild Magic Surge)",
    scope: "world",
    config: true,
    default: wmFeatureDefault,
    type: String,
  });

  /** name of the table on which to roll if a surge occurs */
  game.settings.register("dnd5e-helpers", "wmTableName", {
    name: "Wild Magic Surge Table Name",
    hint: "Name of table that should be rolled on if a surge occurs (default: Wild-Magic-Surge-Table). Leave empty to skip this step.",
    scope: "world",
    config: true,
    default: wmSurgeTableDefault,
    type: String,
  });

  /** name of the feature to trigger on */
  game.settings.register("dnd5e-helpers", "wmToCFeatureName", {
    name: "Tides of Chaos Feature Name",
    hint: "Name of feature that represents the Sorcerer's Tides of Chaos (default: Tides of Chaos)",
    scope: "world",
    config: true,
    default: wmToCFeatureDefault,
    type: String,
  });

  /** toggle result gm whisper for WM */
  game.settings.register("dnd5e-helpers", "wmWhisper", {
    name: "Blind Table Draw",
    hint: "Hides table results of a successful surge. Viewable by GM only.",
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
  });

  /** enable auto reaction reset */
  game.settings.register("dnd5e-helpers", "cbtReactionEnable", {
    name: "Reaction status automation.",
    hint: "Enables or disables this feature (global). Apply checks for Reaction Abilities or out-of-turn Actions and applies the specified status. Remove will automatically remove this effect at the start of an actor's turn",
    scope: "world",
    type: Number,
    choices: {
      0: "None",
      1: "Only Apply",
      2: "Only Remove",
      3: "Apply and Remove",
    },
    default: 0,
    config: true,
  });

  game.settings.register("dnd5e-helpers", "cbtReactionStatus", {
    name: "Reaction status name",
    hint: "As seen when hovering over the status in the token HUD (default: Weakened).",
    scope: "world",
    config: true,
    default: "Weakened",
    type: String,
  });

  /** enable auto legact reset */
  game.settings.register("dnd5e-helpers", "cbtLegactEnable", {
    name: "Start of turn legendary action reset.",
    hint: "Enables or disables this feature (global)",
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
  });

  /** enable auto ability charge roll */
  game.settings.register("dnd5e-helpers", "cbtAbilityRecharge", {
    name: "Automatically roll any uncharged abilities with a d6 recharge.",
    hint: "Enables or disables this feature (global)",
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
  });

  game.settings.register("dnd5e-helpers", "autoProf", {
    name: 'Auto Proficiency',
    hint: 'Checks newly added items and labels as proficient if needed',
    scope: 'world',
    type: Boolean,
    default: true,
    config: true,
  });

  game.settings.register("dnd5e-helpers", "autoRegen", {
    name: 'Automatic regeneration ',
    hint: 'Automaticly prompts for regeneration rolls for the GM',
    scope: 'world',
    type: Boolean,
    default: false,
    config: true,
  });

  game.settings.register("dnd5e-helpers", "undeadFort", {
    name: 'Undead Fortitude',
    hint: 'Automaticly prompts for Undead Fortitude Checks for the GM',
    scope: 'world',
    type: String,
    choices: {
      "0": "No checks",
      "1": "Quick Saves",
      "2": "Advanced Saves",
    },
    default: "0",
    config: true,
  });

  game.settings.register("dnd5e-helpers", "gwEnable", {
    name: 'Great Wound',
    hint: 'Rolls on a specified table when a token takes over 50% max hp in a single blow',
    scope: 'world',
    type: Boolean,
    default: false,
    config: true,
  });

  game.settings.register("dnd5e-helpers", "gwFeatureName", {
    name: "Great Wound name replacement",
    hint: "What name to display for Great Wound functions",
    scope: "world",
    config: true,
    default: "Great Wound",
    type: String,
  });

  game.settings.register("dnd5e-helpers", "gwTableName", {
    name: "Great Wound Table",
    hint: "Name of table that should be rolled on if a Great Wound occurs.",
    scope: "world",
    config: true,
    default: "",
    type: String,
  });

  game.settings.register("dnd5e-helpers", "owFeatureName", {
    name: "Open Wound feature name",
    hint: "What name to display for Open Wound functions.",
    scope: "world",
    config: true,
    default: "Open Wound",
    type: String,
  });

  game.settings.register('dnd5e-helpers', 'owDeathSave', {
    name: 'Open Wound - Death Saves',
    hint: 'Open Wounds triggered on death saves failed by 5 or more',
    scope: 'world',
    type: Boolean,
    default: false,
    config: true,
  });

  game.settings.register('dnd5e-helpers', 'owCrit', {
    name: 'Open Wound - Crits',
    hint: 'Open Wounds triggered on attack rolls. If an attack roll is greater than this value an Open Wound is rolled. To disable this leave the field blank',
    scope: 'world',
    config: true,
    default: 0,
    type: Number,
  });

  game.settings.register('dnd5e-helpers', 'owHp0', {
    name: 'Open Wound - HP at 0',
    hint: 'Open Wounds triggered on dropping to 0 HP',
    scope: 'world',
    type: Boolean,
    default: false,
    config: true,
  });

  game.settings.register('dnd5e-helpers', 'owHp0GW', {
    name: 'Open Wound - HP at 0 from a Great Wound',
    hint: 'Open Wounds triggered on dropping to 0 HP from a damage source dealing over half the actors max HP (requires Great Wounds active)',
    scope: 'world',
    type: Boolean,
    default: false,
    config: true,
  });

  game.settings.register("dnd5e-helpers", "owTable", {
    name: "Open Wound Table",
    hint: "Name of table that should be rolled on if a Open Wound occurs.",
    scope: "world",
    config: true,
    default: "",
    type: String,
  });

  game.settings.register("dnd5e-helpers", "debug", {
    name: 'Debugging',
    hint: 'Adds a few console logs for debugging purposes',
    scope: 'world',
    type: Boolean,
    default: false,
    config: true,
  });
});


Hooks.on('ready', () => {
  console.log("dnd5e helpers socket setup")
  game.socket.on(`module.dnd5e-helpers`, socketData => {
    console.log("Dnd5e helpers socket recived")
    //Rolls Saves for owned tokens 
    if (socketData.greatwound === true) {
      let actor = game.actors.get(socketData.actorId);
      for (const [key, value] of Object.entries(socketData.users)) {
        if ((value === 3) && game.users.get(`${key}`).data.role !== 4) {
          if (game.user.data._id === `${key}`) {
            if (socketData.hp !== 0) {
              DrawGreatWound(actor);
            }
            if (socketData.hp === 0 && game.settings.get('dnd5e-helpers', 'owHp0GW') === true) {
              const gwFeatureName = game.settings.get("dnd5e-helpers", "gwFeatureName");
              OpenWounds(actor.data.name, `from ${gwFeatureName} reduce them to 0 hp`)
            }
          }
        }
      }
    }
  })
})

  /** helper functions */

function IsFirstGM() {
  return game.user === game.users.find((u) => u.isGM && u.active);
}

function GetKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

//find status effect based on passed name
function GetStatusEffect(statusName) {
  /** Core Status Effects -- pass displayed name backwards through localization to match to status.label */
  const { EFFECT } = game.i18n.translations;

  /** find the key (will be label) from the value */
  let statusLabel = GetKeyByValue(EFFECT, statusName);
  let statusEffect = CONFIG.statusEffects.find(st => st.label === `EFFECT.${statusLabel}`);

  if (statusEffect) {
    /** first match is core, always prefer core */
    return statusEffect;
  }
  else {
    /** cant find it, it still may be available via other modules/methods */

    /** CUB Compatibility -- statusName matches displayed CUB name (status.label) */
    if (!statusEffect && game.modules.get("combat-utility-belt")?.active) {

      /** if we find it, pick it */
      statusEffect = CONFIG.statusEffects.find(st => st.label === statusName);
    }

    //note: other module compatibilities should check for a null statusEffect before
    //      changing the current statusEffect. Priority based on evaluation order.
  }

  /** return the best label we found */
  return statusEffect;
}

//toggle core status effects
async function ToggleStatus(token, status) {
  return await token.toggleEffect(status);
}

//apply a CUB status effect
async function ApplyCUB(token, cubStatus) {
  return await game.cub.addCondition(cubStatus, token)
}

//remove a CUB status effect
async function RemoveCUB(token, cubStatus) {
  return await game.cub.removeCondition(cubStatus, token)
}

/** Prof array check */
function includes_array(arr, comp) {
  //Ignore empty array
  if (arr.toString() == [""]) {
    return false;
  }
  return arr.reduce((acc, str) => comp.toLowerCase().includes(str.toLowerCase()) || acc, false);
}

/** \helper functions */
/** roll on the provided table */
function RollOnWildTable(rollType) {  
  const wmTableName = (game.settings.get('dnd5e-helpers', 'wmTableName') !== '') 
    ? game.settings.get('dnd5e-helpers', 'wmTableName') : wmSurgeTableDefault;

  if (wmTableName !== "") {
    game.tables.getName(wmTableName).draw({ roll: null, results: [], displayChat: true, rollMode: rollType });
  } else {
    if (game.settings.get('dnd5e-helpers', 'debug')) {
      console.log('Dnd5e Helper: No Wild Surge table setup');
    }    
  }
}

function GetTidesOfChaosFeatureName(){
  return (game.settings.get('dnd5e-helpers', 'wmToCFeatureName') !== '') 
    ? game.settings.get('dnd5e-helpers', 'wmToCFeatureName') : wmToCFeatureDefault;
}

/** Roll a normal surge as per D&D 5e standard rules */
function RollForNormalSurge(spellLevel, rollType) {
  const roll = new Roll("1d20").roll();
  const d20result = +roll["result"];

  if (game.settings.get('dnd5e-helpers', 'debug')) {
    console.log(`DnD5e Helper: Normal Surge - ${d20result}`);
  }

  if (d20result === 1) {
    ShowSurgeResult('surges', spellLevel, `([[/r ${d20result} #1d20 result]])`);
    RollOnWildTable(rollType);
  } else {
    ShowSurgeResult('remains calm', spellLevel, `([[/r ${d20result} #1d20 result]])`);
  }
}

/** Role a more surge, checking against spell level cast */
async function RollForMoreSurge(spellLevel, rollType, actor) {
  const roll = new Roll("1d20").roll();
  const d20result = +roll["result"];

  if (game.settings.get('dnd5e-helpers', 'debug')) {
    console.log(`DnD5e Helper: More Surge - ${d20result} vs ${spellLevel}`);
  }

  if (d20result <= spellLevel) {
    ShowSurgeResult('surges', spellLevel, `([[/r ${d20result} #1d20 result]])`);
    RollOnWildTable(rollType);
    
    /** recharge TOC if we surged */
    const tocName = GetTidesOfChaosFeatureName();
    if (IsTidesOfChaosSpent(actor, tocName )) {
      return ResetTidesOfChaos(actor, tocName );
    }
  } else {
    ShowSurgeResult('remains calm', spellLevel, `([[/r ${d20result} #1d20 result]])`);
  }
  
  return;
}

/** Role a volatile surge, checking against spell level cast + d4 */
async function RollForVolatileSurge(spellLevel, rollType, actor) {
  const wmToCFeatureName = GetTidesOfChaosFeatureName();
  if (wmToCFeatureName !== '') {
      
      const tocSpent = IsTidesOfChaosSpent(actor, wmToCFeatureName); 

      const d20roll = new Roll("1d20").roll();
      const d4roll = new Roll("1d4").roll();
      const d20result = +d20roll["result"];

      /** if tides of chaos hasn't been used then no volatile roll */
      const d4result = tocSpent ? +d4roll["result"] : 0;

      if (game.settings.get('dnd5e-helpers', 'debug')) {
        console.log(`DnD5e Helper: Volatile Surge - ${d20result} vs ${spellLevel + d4result}(Spell: ${spellLevel})(d4: ${d4result})`);
      }

      if (d20result <= (spellLevel + d4result)) {
        await ShowSurgeResult('surges', spellLevel, `([[/r ${d20result} #1d20 result]])`, `(+[[/r ${d4result} #1d4 result]])`);
        RollOnWildTable(rollType);
        
        if (tocSpent){
          /** return the promise of the item update */
          return ResetTidesOfChaos(actor, wmToCFeatureName);
        }
      } else {
        return ShowSurgeResult('remains calm', spellLevel, `([[/r ${d20result} #1d20 result]])`, `(+[[/r ${d4result}  #1d4 result]])`);
      }
  } else {
    if (game.settings.get('dnd5e-helpers', 'debug')) {
      console.log('Dnd5e Helper: Tides of Chaos feature name not setup');
    }
  }
  
  return; //no promise
}

/** show surge result in chat box */
async function ShowSurgeResult(action, spellLevel, resultText, extraText = '') {
  return ChatMessage.create({
    content: `<i>${action} as a level ${spellLevel} ${extraText} spell is cast!</i> ${resultText}`,
    speaker: ChatMessage.getSpeaker({ alias: "The Weave" })
  });
}

/** is the tides of chaos feature used */
function IsTidesOfChaosSpent(actor, wmToCFeatureName) {
  const tocItem = actor.items.getName(wmToCFeatureName);
  
  if (tocItem) {
    return (tocItem.data.data.uses.value === 0);
  } else {
    return false;
  }
}

/** reset the tides of chaose feature also reset the resource if that is also used */
async function ResetTidesOfChaos(actor, wmToCFeatureName) {
  const tocItem = actor?.items.getName(wmToCFeatureName);

  if (tocItem) {
      const item = await tocItem.update({ 'data.uses.value': tocItem.data.data.uses.max });
      actor.sheet.render(false);
      return item;
    }    
  
  return tocItem;
}

function NeedsRecharge(recharge = { value: 0, charged: false }) {
  return (recharge.value !== null &&
    (recharge.value > 0) &&
    recharge.charged !== null &&
    recharge.charged == false);
}

function CollectRechargeAbilities(token) {
  const rechargeItems = token.actor.items.filter(e => NeedsRecharge(e.data.data.recharge));
  return rechargeItems;
}

async function RechargeAbilities(token) {
  const rechargeItems = CollectRechargeAbilities(token);

  for (item of rechargeItems) {
    await item.rollRecharge();
  }
}

/** Wild Magic Surge Handling */
async function WildMagicSurge_preUpdateActor(actor, update, selectedOption) {
  const origSlots = actor.data.data.spells;

  /** find the spell level just cast */
  const spellLvlNames = ["spell1", "spell2", "spell3", "spell4", "spell5", "spell6", "spell7", "spell8", "spell9"];
  let lvl = spellLvlNames.findIndex(name => { return getProperty(update, "data.spells." + name) });

  const preCastSlotCount = getProperty(origSlots, spellLvlNames[lvl] + ".value");
  const postCastSlotCount = getProperty(update, "data.spells." + spellLvlNames[lvl] + ".value");
  const bWasCast = preCastSlotCount - postCastSlotCount > 0;

  const wmFeatureName = (game.settings.get('dnd5e-helpers', 'wmFeatureName') !== '') 
    ? game.settings.get('dnd5e-helpers', 'wmFeatureName') : wmFeatureDefault;
  const wmFeature = actor.items.find(i => i.name === wmFeatureName) !== null

  lvl++;
  console.log("A level " + lvl + " slot was expended(" + bWasCast + ") by a user with the Wild Magic Feature(" + wmFeatureName + ")");

  let promise = null;
  if (wmFeature && bWasCast && lvl > 0) {
    /** lets go baby lets go */
    console.log("Rolling for surge...");

    const rollMode = game.settings.get('dnd5e-helpers', 'wmWhisper') ? "blindroll" : "roll";
    if (selectedOption === 1) {
      RollForNormalSurge(lvl, rollMode);
    } else if (selectedOption === 2) {
      promise = RollForMoreSurge(lvl, rollMode, actor);
    } else if (selectedOption === 3) {
      promise = RollForVolatileSurge(lvl, rollMode, actor);
    }
  }
  
  return promise;
}

/** sets current legendary actions to max (or current if higher) */
async function ResetLegAct(actor, tokenName) {
  if (actor == null) {
    return null;
  }
  let legact = actor.data.data.resources.legact;
  if (legact && legact.value !== null) {
    /** only reset if needed */
    if (legact.value < legact.max) {
      ui.notifications.info(`Legendary actions restored to ${legact.max} for ${tokenName}`)
      let newActor = await actor.update({ 'data.resources.legact.value': legact.max });
      newActor.sheet.render(false);
      return newActor;
    }
    
    return actor;
  }
}

/** checks for Unlinked Token Great Wounds */
function GreatWound_preUpdateToken(scene, tokenData, update) {

  //find update data and original data
  let actor = game.actors.get(tokenData.actorId)
  let data = {
    actorData: canvas.tokens.get(tokenData._id).actor.data,
    updateData: update,
    actorHP: getProperty(tokenData, "actorData.data.attributes.hp.value"),
    actorMax: getProperty(tokenData, "actorData.data.attributes.hp.max"),
    updateHP: update.actorData.data.attributes.hp.value,
  }
  if (data.actorMax == undefined) {
    data.actorMax = actor.data.data.attributes.hp.max;
  }
  if (data.actorHP == undefined) {
    data.actorHP = data.actorMax;
  }
  let hpChange = (data.actorHP - data.updateHP)
  // check if the change in hp would be over 50% max hp
  if (hpChange >= Math.ceil(data.actorMax / 2) && data.updateHP !== 0) {
    const gwFeatureName = game.settings.get("dnd5e-helpers", "gwFeatureName");
    new Dialog({
      title: `${gwFeatureName} roll for ${actor.name}`,
      buttons: {
        one: {
          label: "Roll",
          callback: () => {
            DrawGreatWound(actor);
          }
        }
      }
    }).render(true)
  }
}


/** checks for Linked Token Great Wounds */
function GreatWound_preUpdateActor(actor, update) {

  //find update data and original data
  let data = {
    actor: actor,
    actorData: actor.data,
    updateData: update,
    actorHP: actor.data.data.attributes.hp.value,
    actorMax: actor.data.data.attributes.hp.max,
    updateHP: (hasProperty(update, "data.attributes.hp.value") ? update.data.attributes.hp.value : 0),
    hpChange: (actor.data.data.attributes.hp.value - (hasProperty(update, "data.attributes.hp.value") ? update.data.attributes.hp.value : actor.data.data.attributes.hp.value))
  };

  const gwFeatureName = game.settings.get("dnd5e-helpers", "gwFeatureName");
  // check if the change in hp would be over 50% max hp
  if (data.hpChange >= Math.ceil(data.actorMax / 2)) {
    new Dialog({
      title: `${gwFeatureName} roll for ${actor.name}`,
      buttons: {
        one: {
          label: "Roll",
          callback: () => {
            if (game.user.data.role !== 4) {
              DrawGreatWound(actor)
              return;
            }

            const socketData = {
              users: actor._data.permission,
              actorId: actor._id,
              greatwound: true,
              hp: data.updateHP,
            }
            console.log("socket send with " + socketData)
            game.socket.emit(`module.dnd5e-helpers`, socketData)
          }
        }
      }
    }).render(true)
  }
}

/** rolls on specified Great Wound Table */
function DrawGreatWound(actor) {
  const gwFeatureName = game.settings.get("dnd5e-helpers", "gwFeatureName");
  (async () => {
    let gwSave = await actor.rollAbilitySave("con");
    if (gwSave.total < 15) {
      const greatWoundTable = game.settings.get("dnd5e-helpers", "gwTableName");
      ChatMessage.create({ content: `${actor.name} failed the ${gwFeatureName} save` });
      if (greatWoundTable !== "") {
        game.tables.getName(greatWoundTable).draw({ roll: null, results: [], displayChat: true });
      }
      else {
        ChatMessage.create({ content: `Looks like you havnt setup a table to use for ${gwFeatureName} yet` });
      }
    }
    else {
      ChatMessage.create({ content: `${actor.name} passed the ${gwFeatureName} save` });
    }
  })();
}



/** auto prof Weapon ONLY for specific proficiencies (not covered by dnd5e 1.2.0) */
function AutoProfWeapon_createOwnedItem(actor, item) {

  //finds item data and actor proficiencies 
  let { name } = item;
  let { weaponProf } = actor.data.data.traits;
  let proficient = false;
  
  //if item name matches custom prof lis then prof = true
  const weaponProfList = weaponProf.custom.split(" ").map(s => s.slice(0, -1))
  if (includes_array(weaponProfList, name) || includes_array(weaponProfList, `${name}s`)) proficient = true;

  // update item to match prof, otherwise, leave as is (dnd5e system will handle generic profs)
  if (proficient) {
    actor.updateOwnedItem({ _id: item._id, "data.proficient": true });
    console.log(name + " is marked as proficient")
  } /* else {
    //Remove proficiency if actor is not proficient and the weapon has proficiency set.
    if (!proficient && item.data.proficient) {
      actor.updateOwnedItem({ _id: item._id, "data.proficient": false });
      console.log(name + " is marked as not proficient")
    } else {
      ui.notifications.notify(name + " could not be matched to proficiency, please adjust manually.");
    }
  }
  */
}

/** Auto prof Armor ONLY for specific proficiencies (not covered by dnd5e 1.2.0) */
function AutoProfArmor_createOwnedItem(actor, item) {

  //finds item data and actor proficiencies 
  let { name } = item;
  let { armorProf } = actor.data.data.traits;
  let proficient = false;
  
  /* NOTE: I know of no examples of being granted "Studded Leather Armor" proficiency,
   *       but it does not make grammatical sense for them to be optionaly pluralized,
   *       so do not consider plurals when matching like weapons
  */
  
  //if item name matches custom prof lis then prof = true
  if (includes_array(armorProf.custom.split(" ").map(s => s.slice(0, -1)), name)) proficient = true;

  // update item to match prof, otherwise, leave as is (dnd5e will handle generic profs)
  //For items that are not armors (trinkets, clothing) we assume prof = true 
  if (proficient || pass_type == null) {
    actor.updateOwnedItem({ _id: item._id, "data.proficient": true });
    console.log(name + " is marked as proficient")
  } 
}

/**Auto Prof Tools*/
function AutoProfTool_createOwnedItem(actor, item) {

  //finds item data and actor proficiencies 
  let { name } = item;
  let { toolProf } = actor.data.data.traits;
  let proficient = false;

  //pass_name is here to match some of the toolProf strings
  const pass_name = name.toLowerCase().replace("navi", "navg").replace("thiev", "thief");

  if (includes_array(toolProf.value, pass_name)) proficient = true;

  //if item name matches custom prof lis then prof = true
  if (includes_array(toolProf.custom.split(" ").map(s => s.slice(0, -1)), name)) proficient = true;

  // update item to match prof
  //For items that are not armors (trinkets, clothing) we assume prof = true 
  if (proficient) {
    actor.updateOwnedItem({ _id: item._id, "data.proficient": 1 });
    console.log(name + " is marked as proficient")
  } else {
    ui.notifications.notify(name + " could not be matched to proficiency , please adjust manually");
  }
}

/** 
 * Auto regeneration on turn start
 */
async function Regeneration(token) {
  if (token.actor == null) {
    return;
  }
  let regen = token.actor.items.find(i => i.name === "Regeneration" || i.name === "Self-Repairing");

  let data = {
    tokenHP: getProperty(token, "data.actorData.data.attributes.hp.value"),
    actorMax: token.actor.data.data.attributes.hp.max,
  }

  if(token.data.actorLink === true)data.tokenHP = token.actor.data.data.attributes.hp.value
  // if token isnt damaged, set tokenHP to max
  if (data.tokenHP == undefined) {
    data.tokenHP = data.actorMax
  }
  // parse the regeration item to locate the formula to use 

  const regenRegExp = new RegExp("([0-9]+|[0-9]*d0*[1-9][0-9]*) hit points");
  let match = regen.data.data.description.value.match(regenRegExp);
  if (!match) return undefined;
  let regenAmout = match[1];

  //dialog choice to heal or not
  if (regenAmout !== null) {
    new Dialog({
      title: "Regeneration for " + token.name,
      content: token.name + ` currently has ${data.tokenHP}/${data.actorMax} Hp`,
      buttons: {
        one: {
          label: `Apply healing of ${regenAmout}`,
          callback: () => {
            let regenRoll = new Roll(regenAmout).roll().total;
            token.actor.applyDamage(- regenRoll);
            ChatMessage.create({ content: token.name + ` was healed for ${regenRoll}`, whisper: ChatMessage.getWhisperRecipients('gm').map(o => o.id) });
          }
        },
        two: {
          label: "Do not heal",
        }
      }
    }).render(true);

  }
}

//quick undead fort check, just checks change in np, not total damage
async function UndeadFortCheckQuick(tokenData, update, options) {
  
  let data = {
    actorData: canvas.tokens.get(tokenData._id).actor.data,
    updateData: update,
    actorId: tokenData.actorId,
    actorHp: await getProperty(tokenData, "actorData.data.attributes.hp.value"),
    updateHP: update.actorData.data.attributes.hp.value,
  }

  if (data.actorHp == null) {
    data.actorHp = game.actors.get(data.actorId).data.data.attributes.hp.max
  }
  let hpChange = (data.actorHp - data.updateHP)
  let token = canvas.tokens.get(tokenData._id)
  if (!options.skipUndeadCheck) {
    new Dialog({
      title: "Undead Fortitude Save",
      content: "<p>What was the damage source</p>",
      buttons: {
        one: {
          label: "Radiant Damage or Critical Hit",
          callback: () => {
            token.update({ hp: 0 }, { skipUndeadCheck: true })
            ui.notifications.notify("The target dies outright")
            return;
          },
        },
        two: {
          label: "Normal Damage",
          callback: async () => {
            let { total } = await token.actor.rollAbilitySave("con")
            if (total >= (5 + hpChange)) {
              ui.notifications.notify(`${token.name} survives with a ${total}`)
              token.update({ "actorData.data.attributes.hp.value": 1 }, { skipUndeadCheck: true });
            } else if (total < (5 + hpChange)) {
              ui.notifications.notify(`${token.name} dies as it rolls a ${total} `)
              token.update({ "actorData.data.attributes.hp.value": 0 }, { skipUndeadCheck: true })
            }
          },
        },
      },
    }).render(true);
    return false;
  } else return true;
}

// undead fort check, requires manual input
function UndeadFortCheckSlow(tokenData, update, options) {
  let data = {
    actorData: canvas.tokens.get(tokenData._id).actor.data,
    updateData: update,
    actorHP: tokenData.actorData.data.attributes.hp.value,
    updateHP: update.actorData.data.attributes.hp.value,
    hpChange: (tokenData.actorData.data.attributes.hp.value - update.actorData.data.attributes.hp.value)
  }
  let token = canvas.tokens.get(tokenData._id)
  if (!options.skipUndeadCheck) {
    let content = `
    <form>
            <div class="form-group">
                <label for="num">Damage to target: </label>
                <input id="num" name="num" type="number" min="0"></input>
            </div>
        </form>`;
    new Dialog({
      title: "Undead Fortitude Save",
      content: content,
      buttons: {
        one: {
          label: "Radiant Damage or Critical Hit",
          callback: () => {
            token.update({ hp: 0 }, { skipUndeadCheck: true })
            ui.notifications.notify("The target dies outright")
            return;
          },
        },
        two: {
          label: "Normal Damage",
          callback: async (html) => {
            let { total } = await token.actor.rollAbilitySave("con")
            let number = Number(html.find("#num")[0].value);
            if (total >= (5 + number)) {
              ui.notifications.notify(`${token.name} survives with a ${total}`)
              token.update({ "actorData.data.attributes.hp.value": 1 }, { skipUndeadCheck: true });
            } else if (total < (5 + number)) {
              ui.notifications.notify(`${token.name} dies as it rolls a ${total} `)
              token.update({ "actorData.data.attributes.hp.value": 0 }, { skipUndeadCheck: true })
            }
          },
        },
      },
    }).render(true);
    return false;
  } else return true;
}

/** apply a reaction status to the token if the item looks like it should use a reaction (requires active combat) */
function ReactionApply(castingActor, castingToken, itemId) {
  //only trigger for GM account and if an item is present, prevents multiple effects being added
  if (IsFirstGM() && itemId !== undefined) {
    const reactionStatus = game.settings.get('dnd5e-helpers', 'cbtReactionStatus');
    let statusEffect = GetStatusEffect(reactionStatus);

    /** bail out if we can't find the status. */
    if (!statusEffect) {
      if (game.settings.get('dnd5e-helpers', 'debug')) {
        console.log("Dnd5e helpers: Could not find staus: " + reactionStatus)
      }
      return;
    }

    //find the current token instance that called the roll card
    let currentCombatant = getProperty(game.combats, "active.current.tokenId");
    if (!currentCombatant) {
      return;
    }

    if (castingToken === null && castingActor === null) {
      if (game.settings.get('dnd5e-helpers', 'debug')) {
        console.log("Dnd5e helpers: Not an actors item roll")
      }
      return; // not a item roll message, prevents unneeded errors in console
    }

    //find token for linked actor 
    if (castingToken === null && castingActor !== null) {
      castingToken = canvas.tokens.placeables.find(i => i.actor?.data._id.includes(castingActor)).data._id
    }

    let effectToken = canvas.tokens.get(castingToken)

    let ownedItem = effectToken.actor.getOwnedItem(itemId);
    const { activation } = ownedItem.labels;

    /** strictly defined activation types. 0 action (default) will not trigger, which is by design */
    const isAction = activation === "1 Action";
    const isReaction = activation === "1 Reaction";

    let shouldApply = isReaction || (isAction && (currentCombatant !== castingToken));

    if (shouldApply) {
      if (game.modules.get("combat-utility-belt")?.active) {

        /** first, test if this is a cub condition */
        if (game.cub.getCondition(reactionStatus)) {
          ApplyCUB(effectToken, reactionStatus)
          return; //early exit once we trigger correctly
        }
      }

      /** if nothing else , it should be core -- if the effect is already present, dont toggle
       * @todo maybe put out a nice reminder that you have used your action in chat? */
      const existing = effectToken.actor.effects.find(e => e.getFlag("core", "statusId") === statusEffect.id);
      if (!existing) {
        ToggleStatus(effectToken, statusEffect);
        return; //early exit once we trigger correctly
      }
    }
  }
}

async function ReactionRemove(currentToken) {
  const reactionStatus = game.settings.get('dnd5e-helpers', 'cbtReactionStatus');
  let statusEffect = GetStatusEffect(reactionStatus);

  if (game.settings.get('dnd5e-helpers', 'debug')) {
    console.log(`Dnd5e Helpers: status effect is: ${statusEffect}`)
  }

  /** latest version, attempt to play nice with active effects and CUB statuses */
  if (!statusEffect) {
    console.log("dnd5e-helpers: could not located active effect named: " + reactionStatus);
    return;
  }

  /** Remove an existing effect (stoken from foundy.js:44223) */
  if (!currentToken.actor) {
    /** actorless tokens cannot receive effects */
    return;
  }
  const existing = currentToken.actor.effects.find(e => e.getFlag("core", "statusId") === statusEffect.id);
  if (existing) {
    if (game.modules.get("combat-utility-belt")?.active) {

      /** first, test if this is a cub condition */
      if (game.cub.getCondition(reactionStatus)) {
        await RemoveCUB(currentToken, reactionStatus)
        return; //early exit once we trigger correctly
      }
    }

    /** if nothing else , it should be core */
    await ToggleStatus(currentToken, statusEffect);
    return; //early exit once we trigger correctly
  }

}

// roll on specified open wounds tabel if triggered
function OpenWounds(actorName, woundType) {
  const owFeatureName = game.settings.get("dnd5e-helpers", "owFeatureName");
  const openWoundTable = game.settings.get('dnd5e-helpers', 'owTable')
  ChatMessage.create({ content: `${actorName} has suffered an ${owFeatureName} ${woundType}` })
  if (openWoundTable !== "") {
    game.tables.getName(openWoundTable).draw({ roll: null, results: [], displayChat: true });
  } else {
    ChatMessage.create({ content: `Looks like you havnt setup a table to use for ${owFeatureName} yet` });
  }
}

//collate all preUpdateActor hooked functions into a single hook call
Hooks.on("preUpdateActor", async (actor, update, options, userId) => {
  //check what property is updated to prevent unnessesary function calls
  let hp = getProperty(update, "data.attributes.hp.value");
  let spells = getProperty(update, "data.spells");
  if (game.settings.get('dnd5e-helpers', 'debug')) {
    console.log(`Dnd5e Helpers: ${actor.name}'s update contains hp: ${hp}, spells: ${spells}`)
  }
  /** WM check, are we enabled for the current user? */
  const wmSelectedOption = game.settings.get('dnd5e-helpers', 'wmOptions');
  if (wmSelectedOption !== 0 && spells !== undefined) {
    await WildMagicSurge_preUpdateActor(actor, update, wmSelectedOption)
  }
  // GW check 
  if ((game.settings.get('dnd5e-helpers', 'gwEnable')) && (hp !== undefined)) {
    GreatWound_preUpdateActor(actor, update);
  }
  //OW check
  if ((game.settings.get('dnd5e-helpers', 'owHp0')) && (hp === 0)) {
    OpenWounds(actor.data.name, "from falling to 0hp")
  }
});


/** All preUpdateCombat hooks are managed here */
Hooks.on("updateCombat", async (combat, changed, options, userId) => {

  /** only concerned with turn changes */
  if (!("turn" in changed)) {
    return;
  }

  /** just want this to run for GMs */
  /** features to be executed _only_ by the first gm:
   *  Legenadry Action reset
   *  d6 ability recharge
   *  reaction status clear
   */
  const firstGm = game.users.find((u) => u.isGM && u.active);
  if (firstGm && game.user === firstGm) {

    // early return if no combatants active 
    let thisCombat = game.combats.get(combat.id);
    if (thisCombat.data.combatants.length == 0) return;

    /** begin removal logic for the _next_ token */
    const nextTurn = combat.turns[changed.turn];
    /** data structure for 0.6 */
    let nextTokenId = null;
    if (getProperty(nextTurn, "tokenId")) {
      nextTokenId = nextTurn.tokenId;
    }
    else {
      nextTokenId = getProperty(nextTurn, token._id);
    }


    let currentToken = canvas.tokens.get(nextTokenId);

    /** we dont care about tokens without actors */
    if (!currentToken.actor) {
      return;
    }

    let regen = currentToken.actor.items.find(i => i.name === "Regeneration" || i.name === "Self-Repairing");

    if (game.settings.get('dnd5e-helpers', 'debug')) {
      let regenSett = !!regen
      console.log(`Dnd5e Helpers: ${currentToken.name}'s update contains regen: ${regenSett}`)
    }

    /** @todo data vs _data -- multiple updates reset changes made by previous updates */
    if (currentToken) {
      if (game.settings.get('dnd5e-helpers', 'cbtLegactEnable') == true) {
        await ResetLegAct(currentToken.actor, currentToken.name)
      }

      if (game.settings.get('dnd5e-helpers', 'cbtAbilityRecharge') == true) {
        await RechargeAbilities(currentToken);
      }

      if ((game.settings.get('dnd5e-helpers', 'autoRegen')) && (!!regen === true)) {
        await Regeneration(currentToken)
      }

      /** hb@todo: functionalize this similar to the other cbt operations */
      const reactMode = game.settings.get('dnd5e-helpers', 'cbtReactionEnable')
      if (reactMode == 2 || reactMode == 3) {
        await ReactionRemove(currentToken)
      }
    }

  }

});

/** all preUpdateToken hooks handeled here */
Hooks.on("preUpdateToken", (scene, tokenData, update, options) => {
  let hp = getProperty(update, "actorData.data.attributes.hp.value");
  if ((game.settings.get('dnd5e-helpers', 'gwEnable')) && hp !== (null || undefined)) {
    GreatWound_preUpdateToken(scene, tokenData, update);
  }

  let Actor = game.actors.get(tokenData.actorId);
  let fortitudeFeature = Actor?.items.find(i => i.name === "Undead Fortitude");
  let fortSett = !!fortitudeFeature;

  /** output debug information -- @todo scope by feature */
  if (game.settings.get('dnd5e-helpers', 'debug')) {
    console.log(`Dnd5e Helpers: ${Actor.name}'s update contains hp: ${hp}, and Fort: ${fortSett}`)
  }

  if (game.settings.get('dnd5e-helpers', 'undeadFort') === "1") {
    if (hp === 0 && fortitudeFeature !== null) {
      UndeadFortCheckQuick(tokenData, update, options)
    }
  }
  if (game.settings.get('dnd5e-helpers', 'undeadFort') === "2") {
    if (hp === 0 && fortitudeFeature !== null) {
      UndeadFortCheckSlow(tokenData, update, options)
    }
  }
});

/** all createOwnedItem hooks handeled here */
Hooks.on("createOwnedItem", (actor, item, sheet, id) => {
  let type = item.type
  if (game.settings.get('dnd5e-helpers', 'autoProf') && (actor.data.type === "character")) {
    switch (type) {
      case "weapon":
        AutoProfWeapon_createOwnedItem(actor, item);
        break;
      case "equipment":
        AutoProfArmor_createOwnedItem(actor, item);
        break;
      case "tool":
        AutoProfTool_createOwnedItem(actor, item);
        break;
      default:
        break;
    }
  }
});



function ReactionDetect_preCreateChatMessage(msg) {

  /** Reactions are only important IF a combat is active. Bail early */
  if (!game.combats.active) {
    if (game.settings.get('dnd5e-helpers', 'debug')) {
      console.log("Dnd5e helpers: Could not find an active combat")
    }
    return;
  }

  if (msg.type == null) {
    /** some weird, freeform chat message...mainly our own */
    return;
  }

  const itemId = $(msg.content).attr("data-item-id");

  /** could not find the item id, must not have been an item */
  if (itemId == undefined) {
    return;
  }

  const speaker = getProperty(msg, "speaker");
  if (speaker) {
    /** hand over to reaction apply logic (checks combat state, etc) */
    ReactionApply(speaker.actor, speaker.token, itemId);
  }
};

Hooks.on("preCreateChatMessage", async (msg, options, userId) => {
  const reactMode = game.settings.get('dnd5e-helpers', 'cbtReactionEnable');
  if (reactMode === 1 || reactMode === 3) {
    ReactionDetect_preCreateChatMessage(msg);
  }

  let rollType = getProperty(msg, "flags.dnd5e.roll.type");
  let itemRoll = getProperty(msg, "flags.dnd5e.roll.itemId");
  if (rollType === "death" && (game.settings.get('dnd5e-helpers', 'owDeathSave'))) {
    if (parseInt(msg.content) < 6) {
      let actor = game.actors.get(msg.speaker.actor);
      OpenWounds(actor.data.name, "from a failed death saving throw");
    }
  }


  if (rollType === "attack" && itemRoll !== undefined && (game.settings.get('dnd5e-helpers', 'owCrit') > 0)) {
    let critRange = game.settings.get('dnd5e-helpers', 'owCrit');
    let rollResult = msg.roll.match(/("result"):([0-9]{1,2})/);
    if (parseInt(rollResult[2]) >= critRange) {
      let targetArray = game.users.get(msg.user).targets;
      for (let targets of targetArray) {
        OpenWounds(targets.actor.data.name, "from a critical hit")
      }
    }
  }
});

Hooks.on("deleteCombat", async (combat, settings, id) => {
  const reactMode = game.settings.get('dnd5e-helpers', 'cbtReactionEnable');
  if (reactMode == 2 || reactMode == 3) {

    for (let token of canvas.tokens.placeables) {
      ReactionRemove(token)
    }
  }
});


/** Measured template 5/5/5 scaling */
Hooks.on("preCreateMeasuredTemplate", async (scene,template)=>{


  /** range 0-3
   *  b01 = line/cone, 
   *  b10 = circles,
   *  b11 = both 
   */
  const templateMode = game.settings.get('dnd5e-helpers', 'gridTemplateScaling');

  if (templateMode == 0) {
    /** template adjusting is not enabled, bail out */
    return;
  }

  if (!!(templateMode & 0b01) && (template.t == 'ray' || template.t == 'cone')) {
    /** scale rays after placement to cover the correct number of squares based on 5e diagonal distance */
    let diagonalScale = Math.abs(Math.sin(Math.toRadians(template.direction))) +
      Math.abs(Math.cos(Math.toRadians(template.direction)))
    template.distance = diagonalScale * template.distance;
  }
  else if (!!(templateMode & 0b10) && template.t == 'circle' &&
    !(template.distance / scene.data.gridDistance < .9)) {

    /** Convert circles to equivalent squares (e.g. fireball is square) 
     *  if the template is 1 grid unit or larger (allows for small circlar
     *  templates as temporary "markers" of sorts
     */

    /** convert to a rectangle */
    template.t = 'rect';

    /** convert radius in grid units to radius in pixels */
    let radiusPx = (template.distance / scene.data.gridDistance) * scene.data.grid;

    /** shift origin to top left in prep for converting to rectangle */
    template.x -= radiusPx;
    template.y -= radiusPx;

    /** convert the "distance" to the squares hypotenuse */
    const length = template.distance * 2;
    template.distance = Math.hypot(length, length);

    /** always measured top left to bottom right */
    template.direction = 45;
  }
});
    

/**
 * Serves as a container for cover data, which is as agnostic as possible, allowing for system extensions
 * Note: Data must be "finalized" prior to chat message output. This finalization function is ripe for override.
 * @todo extract finalize and create chat message into CoverData5e to provide an example of this.
 * @class CoverData
 */
class CoverData {
  constructor(sourceToken, targetToken, visibleCorners, mostObscuringTile, mostObscuringToken){
    this.SourceToken = sourceToken;
    this.TargetToken = targetToken;
    this.VisibleCorners = visibleCorners;
    this.TileCover = mostObscuringTile;
    this.TokenCover = mostObscuringToken;
    
    // @todo this should possibly be a different class, will need a pass when my cover api is better
    this.Summary = {
      Text: "**UNPROCESSED**",
      Source:  "**NONE**",
      FinalCoverLevel: -1,
      FinalCoverEntity: null
    }
  }
  /**
   * 5e specific conversion of visible corners to a cover value
   * @todo implement in CoverData5e
   * @static
   * @param {Int} visibleCorners
   * @return {Int}
   * @memberof CoverData
   */
  static VisibleCornersToCoverLevel(visibleCorners){
    switch (visibleCorners) {
      case 0: return 3;
      case 1: return 2;
      case 2:
      case 3: return 1;
      case 4: return 0;
      default: console.error("Could not convert visible corners to cover level!"); return null;
    }
  }

  /**
   * 5e specific conversion of a generic "coverLevel" to the appropriate string
   * @todo implement in CoverData5e
   * @static
   * @param {Int} coverLevel
   * @return {String} 
   * @memberof CoverData
   */
  static CoverLevelToText(coverLevel) {
    switch (coverLevel) {
      case 0: return "No cover";
      case 1: return "Half cover";
      case 2: return "Three-quarters cover"
      case 3: return "Full cover";
      default: console.error("Could not convert cover level to a string! (Cover level " + coverLevel + ")."); return "";
    }
  }


  /**
   * 5e specific interpretation and consideration of all wall and object collisions to produce a final cover value
   * General flow: If line of sight and objects give same cover, prefer line of sight, and select the entity that gives
   *               the greatest amount of cover. Note: cover in 5e does not "sum".
   * @todo implement in CoverData5e
   * @memberof CoverData
   */
  FinalizeData(){
    /** always prefer line of sight because its more accurate at the moment (>= instead of >) */
    const losCoverLevel = CoverData.VisibleCornersToCoverLevel(this.VisibleCorners);
    
    /** assume LOS will be the main blocker */
    let internalCoverData = { level: losCoverLevel, source: `${this.VisibleCorners} visible corners`, entity: null };
    
    /** prepare the secondary blocker information */
    const tileCoverData = { level: this.TileCover?.getFlag('dnd5e-helpers', 'coverLevel') ?? -1, source: `an intervening object`, entity: this.TileCover };
    const tokenCoverData = { level: !!this.TokenCover ? 1 : -1, source: `${this.TokenCover?.name ?? ""} is in the way`, entity: this.TokenCover };
    
    /** prefer walls -> tiles -> tokens in that order */
    if (tileCoverData.level > internalCoverData.level){
      internalCoverData = tileCoverData;
    }
    
    if (tokenCoverData.level > internalCoverData.level){
      internalCoverData = tokenCoverData;
    }
    
    this.Summary.FinalCoverEntity = internalCoverData.entity;
    this.Summary.FinalCoverLevel = internalCoverData.level;
    this.Summary.Source = internalCoverData.source;
    this.Summary.Text = CoverData.CoverLevelToText(internalCoverData.level);
  }

  /**
   * Base chat message output based on a finalized CoverData object. Can be extended if more system specific information
   * is needed in the message.
   *
   * @return {String} 
   * @memberof CoverData
   */
  toMessageContent() {
    /** the cover data must be fully populated and finalized before anything else can happen */
    if (this.FinalCoverLevel < 0) {
      console.error("Cannot create a chat message from unfinalized cover data!");
      return "";
    }

    /** abuse the dice roll classes to make it look like I know how to UI ;) */
    const content = `<div class="dice-roll"><i>${this.SourceToken.name} checks their sightline to ${this.TargetToken.name}</i>
                      <div class="dice-result">
                        <div class="dice-formula">${this.Summary.Text}</div>
                        <div class="dice-tooltip">
                          <div class="dice"><h4 class="dice-total">${this.Summary.Source}</h4></div></div>`;
    return content;
  }
};



async function onTargetToken(user, target, onOff) {
  /** bail immediately if LOS calc is disabled */ 
  if(game.settings.get('dnd5e-helpers', 'losOnTarget') < 1) { return; }

  /** currently only concerned with adding a target for the current user */
  if (!onOff || user.id !== game.userId) {
    return;  
  }
  
  for( const selected of canvas.tokens.controlled ) {
    let coverData = await selected.computeTargetCover(target);
    
    /** if we got valid cover data back, finalize and output results */
    if (coverData){
      coverData.FinalizeData();
      const content = coverData.toMessageContent();
      ChatMessage.create({ content: content });
    }
  }
  
}

async function DrawDebugRays(drawingList){
  for (let squareRays of drawingList) {
    await canvas.drawings.createMany(squareRays);
  }
}

/**
 * For a given token, generates two types of grid points
 * GridPoints[]: Each grid intersection point contained within the token's occupied squares (unique)
 * Squares[][]: A list of point quads defining the four corners of each occupied square (points will repeat over shared grid intersections)
 *
 * @param {Token} token
 * @return {{GridPoints: [{x: Number, y: Number},...]}, {Squares: [[{x: Number, y: Number},...],...]}} 
 */
function generateTokenGrid(token){

  /** operate at the origin, then translate at the end */
  const tokenBounds = [token.w, token.h];
  
  /** use token bounds as the limiter */
  let boundingBoxes = [];
  let gridPoints = [];
  
  /** @todo this is hideous. I think a flatmap() or something is what i really want to do */

  /** stamp the points out left to right, top to bottom */
  for(let y = 0; y < tokenBounds[1]; y+=canvas.grid.size) {
    for(let x = 0; x < tokenBounds[0]; x+=canvas.grid.size) {
      gridPoints.push([x,y]);
      
      /** create the transformed bounding box. we dont have to do a final pass for that */
      boundingBoxes.push([
        [token.x + x, token.y + y], [token.x + x + canvas.grid.size, token.y + y],
        [token.x + x, token.y + y + canvas.grid.size], [token.x + x + canvas.grid.size, token.y + y + canvas.grid.size]]);
    }

    gridPoints.push([token.width,y]);
  }
  
  /** the final grid point row in the token bounds will not be added */
  for(let x = 0; x < tokenBounds[0]; x+=canvas.grid.size) {
      gridPoints.push([x,token.height]);
  }
    
  /** stamp the final point, since we stopped short (handles non-integer sizes) */
  gridPoints.push([token.width, token.height]);
  
  /** offset the entire grid to the token's absolute position */
  gridPoints = gridPoints.map( localPoint => {
    return [localPoint[0] + token.x, localPoint[1] + token.y];
  })
  
  return {GridPoints: gridPoints, Squares: boundingBoxes};
}

/**
 * Computes the cover value (num visible corners to any occupied grid square) of
 * the specified token if provided, otherwise, the first token in the user's
 * target list.  Can optionally draw each ray tested for cover.
 *
 * @param {Token} [targetToken=null]
 * @param {boolean} [visualize=false]
 * @return {*} 
 */
Token.prototype.computeTargetCover = async function (targetToken = null, 
                                                     mode = game.settings.get('dnd5e-helpers', 'losOnTarget'),
                                                     includeTiles = game.settings.get('dnd5e-helpers', 'losOnTarget') > 0,
                                                     includeTokens = game.settings.get('dnd5e-helpers', 'losWithTokens'),
                                                     visualize = false) { 
  const myToken = this;

  /** if we were not provided a target token, grab the first one the current user has targeted */
  targetToken = !!targetToken ? targetToken : game.user.targets.values().next().value;

  if (!targetToken) { ui.noficiations.error("No target token selected to compute cover for!"); return false; }

  /** dont compute cover on self */
  if(myToken.id == targetToken.id){return false;}

  /** generate token grid points */
  /** if we have been called we are computing LOS, use the requested LOS mode (center vs 4 corners) */
  const myTestPoints = mode > 1 ? generateTokenGrid(myToken).GridPoints : [[myToken.center.x, myToken.center.y]];
  const theirTestSquares = generateTokenGrid(targetToken).Squares;

  const results = myTestPoints.map( xyPoint => {
    
    /** convert the box entries to num visible corners of itself */
    let individualTests = theirTestSquares.map( square => {
      return ( pointToSquareCover(xyPoint,square,visualize));
    });
    
    /** return the most number of visible corners */
    return Math.max.apply(Math, individualTests);
  });
  
    
  const bestVisibleCorners = Math.max.apply(Math, results);
  
  if(_debugLosRays.length > 0){
    await DrawDebugRays(_debugLosRays);
    _debugLosRays = [];
  } 

  const bestCover = CoverFromObjects(myToken, targetToken, includeTiles, includeTokens);
  
  return new CoverData(myToken, targetToken, bestVisibleCorners, bestCover?.bestTile, bestCover?.bestToken);
}

var _debugLosRays = [];

/**
 * Calculate the number of visible corners of a target grid square from a source point
 *
 * @param {{x: Number, y: Number}} sourcePoint
 * @param {[{x: Number, y: Number}],...} targetSquare
 * @param {boolean} [visualize=false]
 * @return {Number} 
 */
function pointToSquareCover(sourcePoint, targetSquare, visualize = false) {

  /** create pairs of points representing the test structure as source point to target array of points */
  let sightLines = {
    source: sourcePoint,
    targets: targetSquare
  }

  /** Debug visualization */
  if (visualize) {
    let debugSightLines = sightLines.targets.map( target => [sightLines.source, target]);

    const myCornerDebugRays = debugSightLines.map(ray => {
      return {
        type: CONST.DRAWING_TYPES.POLYGON,
        author: game.user._id,
        x: 0,
        y: 0,
        strokeWidth: 2,
        strokeColor: "#FF0000",
        strokeAlpha: 0.75,
        textColor: "#00FF00",
        points: [ray[0], ray[1]]
      }
    });

    _debugLosRays.push(myCornerDebugRays);
  }
  /** \Debug visualization */

  /** only restrict vision based on sight blocking walls */
  const options = {
    blockMovement: false,
    blockSenses: true,
    mode: 'any'
  }

  let hitResults = sightLines.targets.map(target => {
    const ray = new Ray({ x: sightLines.source[0], y: sightLines.source[1] }, { x: target[0], y: target[1] });
    return WallsLayer.getRayCollisions(ray, options);
  })

  const numCornersVisible = hitResults.reduce((total,x) => (x==false ? total+1 : total), 0)

  return numCornersVisible;
}

/**
 * Returns all entities in the list that collide with the ray (ray to bounding box)
 * Object must contain x, y, heigh, width fields.
 * @param {Ray} ray
 * @param {[object]} objectList
 * @return {*} 
 */
function CollideAgainstObjects(ray, objectList) {

  /** terrible intersectors follow */

  //create an "x" based on the bounding box (cuts down on 2 collisions per blocker)
  const hitTiles = objectList.filter(tile => {
    /** looking for any collision of this tile's bounds
     *  by creating an "x" from its bounding box
     *  and colliding against those lines */
    //as [[x0,y0,x1,y1],...]
    const boxGroup = [
      [tile.x, tile.y, tile.x + tile.width, tile.y + tile.height],
      [tile.x + tile.width, tile.y, tile.x, tile.y + tile.height],
    ]

    return !!boxGroup.find(boxRay => {
      return ray.intersectSegment(boxRay) !== false;
    })});

  return hitTiles;
}

/**
 *
 *
 * @param {*} sourceToken
 * @param {*} targetToken
 * @return {*} 
 */
function CoverFromObjects(sourceToken, targetToken, includeTiles, includeTokens) {
  /** center to center allows us to run alongside cover calc
    * otherwise we should include cover in the optimal search of cover... */
  const ray = new Ray(sourceToken.center, targetToken.center);
  
  /** create the container to optionally populate with results based on config */
  let objectHitResults = {tiles: null, tokens: null};

  if (includeTiles){
    /** collect "blocker" tiles (this could be cached on preCreateTile or preUpdateTile) */
    const coverTiles = canvas.tiles.placeables.filter(tile => tile.getFlag('dnd5e-helpers', 'coverLevel') ?? 0 > 0);

    /** hits.length is number of blocker tiles hit */
    objectHitResults.tiles = CollideAgainstObjects(ray, coverTiles);  
  }
  
  if(includeTokens){
    /** collect tokens that are not ourselves OR the target token */
    const coverTokens = canvas.tokens.placeables.filter(token => token.id !== sourceToken.id && token.id !== targetToken.id)
    objectHitResults.tokens = CollideAgainstObjects(ray, coverTokens);
  } 

  /** using reduce on an empty array with no starting value is a no go
   *  a starting value (fake tile) is also a no go
   *  so we test and early return null instead.
   */
  const maxCoverLevelTile = objectHitResults.tiles?.length ?? 0 > 0 ? objectHitResults.tiles.reduce( (bestTile, currentTile) => {
    return bestTile?.getFlag('dnd5e-helpers','coverLevel') ?? -1 > currentTile?.getFlag('dnd5e-helpers','coverLevel') ?? -1 ? bestTile : currentTile;
  }) : null;
  
  /** at the moment, we dont care what we hit, since all creatures give 1/2 cover */
  const maxCoverToken = objectHitResults.tokens?.length ?? 0 > 0 ? objectHitResults.tokens[0] : null;
  
  return {bestTile: maxCoverLevelTile, bestToken: maxCoverToken}
}

/** attaches the cover dropdown to the tile dialog */
function onRenderTileConfig (tileConfig, html) {
  
  /** 0 = disabled, get out of here if we are disabled */
  if(game.settings.get('dnd5e-helpers', 'losOnTarget') < 1) { return; }

  const currentCoverType = tileConfig.object.getFlag('dnd5e-helpers', 'coverLevel');
  
  /** anchor our new dropdown at the bottom of the dialog */
  const saveButton = html.find($('button[type="submit"]'));

  let checkboxHTML = `<div class="form-group"><label>Provides Cover</label>
                        <select name="flags.dnd5e-helpers.coverLevel" data-dtype="Number">
                          <option value="0" ${currentCoverType == 0 ? 'selected' : ''}>None</option>
                          <option value="1" ${currentCoverType == 1 ? 'selected' : ''}>Half</option>
                          <option value="2" ${currentCoverType == 2 ? 'selected' : ''}>Three-Quarters</option>
                          <option value="3" ${currentCoverType == 3 ? 'selected' : ''}>Total</option>
                        </select>
                      </div>`;
  
  html.css("height","auto");

  saveButton.before(checkboxHTML);
}

function onPreCreateTile(scene, tileData, options, id){
  const halfPath ="modules/dnd5e-helpers/assets/cover-tiles/half-cover.svg";
  const threePath = "modules/dnd5e-helpers/assets/cover-tiles/three-quarters-cover.svg";
  /** what else could it be? */
  if (tileData.type == "Tile" && (tileData.img == halfPath || tileData.img == threePath)){
    /** its our sample tiles -- set the flag structure */
    const tileCover = tileData.img == halfPath ? 1 : 2;

    if (!tileData.flags){
      tileData.flags = {};
    }

    tileData.flags["dnd5e-helpers"] = {coverLevel: tileCover};
  }
}

/** adding cover dropdown to the tile config dialog */
Hooks.on("renderTileConfig", onRenderTileConfig);

/** calculating cover when a token is targeted */
Hooks.on("targetToken", onTargetToken);

Hooks.on("preCreateTile", onPreCreateTile);