const JSON_ADDRESS = "127.0.0.1";
const JSON_PORT = 7190;
const POLLING_RATE = 333;

const JSON_ENDPOINT = `http://${JSON_ADDRESS}:${JSON_PORT}/`;

var json;

var InventoryCount;
var PlayerInventory;

window.onload = function () {
	getData();
	setInterval(getData, POLLING_RATE);
};

var Asc = function (a, b) {
	if (a > b) return +1;
	if (a < b) return -1;
	return 0;
};

var Desc = function (a, b) {
	if (a > b) return -1;
	if (a < b) return +1;
	return 0;
};

function getData() {
	fetch(JSON_ENDPOINT)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			appendData(data);
		})
		.catch(function (err) {
			clearData();
			console.log("Error: " + err);
		});
}

function appendData(data) {
	var mainContainer = document.getElementById("srtQueryData");
	mainContainer.innerHTML = "";
	if (data.PlayerInventory[0].SlotPosition == null) {
		mainContainer.innerHTML = `<div class="emptyslot"></div>`;
		return;
	}
	PlayerInventory = data.PlayerInventory;
	PlayerInventory.sort(function (a, b) {
		if (a.SlotPosition > b.SlotPosition) {
			return 1;
		}

		if (a.SlotPosition < b.SlotPosition) {
			return -1;
		}
		return 0;
	});
	InventoryCount = data.PlayerInventoryCount;

	var newData = [];

	for (var i = 0; i < InventoryCount; i++) {
		var previousItem = PlayerInventory[i - 1];
		var previousItemExists = typeof previousItem !== "undefined";
		var previousItemIsDouble =
			previousItemExists &&
			typeof newData[previousItem.SlotPosition] !== "undefined" &&
			newData[previousItem.SlotPosition].includes("inventoryslot2");

		if (PlayerInventory[i].IsEmptySlot) {
			if (!previousItemIsDouble) {
				newData[PlayerInventory[i].SlotPosition] = `<div class="emptyslot"></div>`;
			}
		} else if (PlayerInventory[i].IsItem) {
			switch (PlayerInventory[i].ItemID) {
				case 1:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/FirstAidSpray.png" alt="First Aid Spray"/></div>`;
					break;
				case 2:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/GreenHerb.png" alt="Green Herb"/></div>`;
					break;
				case 3:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/RedHerb.png" alt="Red Herb"/></div>`;
					break;
				case 5:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/MixedHerbsGG.png" alt="Mixed Herb (G+G)"/></div>`;
					break;
				case 6:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/MixedHerbsGR.png" alt="Mixed Herb (G+R)"/></div>`;
					break;
				case 9:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/MixedHerbsGGG.png" alt="Mixed Herb (G+G+G)"/></div>`;
					break;
				case 22:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/GreenHerb2.png" alt="Green Herb 2"/></div>`;
					break;
				case 23:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/RedHerb2.png" alt="Red Herb 2"/></div>`;
					break;
				case 31:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/HandgunAmmo.png" alt="Handgun Ammo"><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					break;
				case 32:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/ShotgunAmmo.png" alt="Shotgun Ammo"><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					break;
				case 33:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/AssaultRifleAmmo.png" alt="Assault Rifle Ammo"><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					break;
				case 34:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/MAGAmmo.png" alt="MAG Ammo"><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					break;
				case 36:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/MineRounds.png" alt="Mine Rounds"><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					break;
				case 37:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/ExplosiveRounds.png" alt="Explosive Rounds"><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					break;
				case 38:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/AcidRounds.png" alt="Acid Rounds"><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					break;
				case 39:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/FlameRounds.png" alt="Flame Rounds"><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					break;
				case 61:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/Gunpowder.png" alt="Gunpowder"/></div>`;
					break;
				case 62:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/HighGradeGunpowder.png" alt="High-Grade Gunpowder"/></div>`;
					break;
				case 63:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/ExplosiveA.png" alt="Explosive A"/></div>`;
					break;
				case 64:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/ExplosiveB.png" alt="Explosive B"/></div>`;
					break;
				case 76:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/ModeratorHandgun.png" alt="Moderator Handgun"/></div>`;
					break;
				case 77:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/DotSightHandgun.png" alt="Dot Sight Handgun"/></div>`;
					break;
				case 78:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/ExtendedMagazineHandgun.png" alt="Extended Magazine Handgun"/></div>`;
					break;
				case 91:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/SemiAutoBarrel.png" alt="Semi-Auto Barrel"/></div>`;
					break;
				case 92:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/TacticalStockShotgun.png" alt="Tactical Stock Shotgun"/></div>`;
					break;
				case 93:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/ShellHolderShotgun.png" alt="Shell Holder Shotgun"/></div>`;
					break;
				case 96:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/ScopeAssaultRifle.png" alt="Scope Assault Rifle"/></div>`;
					break;
				case 97:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/DualMagazineAssaultRifle.png" alt="Dual Magazine Assault Rifle"/></div>`;
					break;
				case 98:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/TacticalGripAssaultRifle.png" alt="Tactical Grip Assault Rifle"/></div>`;
					break;
				case 101:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/ExBarrelMAG.png" alt="Ex Barrel MAG"/></div>`;
					break;
				case 131:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/AudiocassetteTape.png" alt="Audiocassette Tape"/></div>`;
					break;
				case 151:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/LockPick.png" alt="Lock Pick"/></div>`;
					break;
				case 152:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/BoltCutters.png" alt="Bolt Cutters"/></div>`;
					break;
				case 161:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/Battery.png" alt="Battery"/></div>`;
					break;
				case 162:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/SafetyDepositKey.png" alt="Safety Deposit Key"/></div>`;
					break;
				case 164:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/BradsIDCard.png" alt="Brads ID Card"/></div>`;
					break;
				case 165:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/DetonatorNoBattery.png" alt="Detonator No Battery"/></div>`;
					break;
				case 166:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/Detonator.png" alt="Detonator"/></div>`;
					break;
				case 181:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/FireHose.png" alt="Fire Hose"/></div>`;
					break;
				case 182:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/KendosGateKey.png" alt="Kendo's Gate Key"/></div>`;
					break;
				case 185:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/CaseLockPick.png" alt="Case Lock Pick"/></div>`;
					break;
				case 186:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot2"><img src="Items/BatteryPack.png" alt="Battery Pack"/></div>`;

					break;
				case 187:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/GreenJewel.png" alt="Green Jewel"/></div>`;
					break;
				case 188:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/BlueJewel.png" alt="Blue Jewel"/></div>`;
					break;
				case 189:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/RedJewel.png" alt="Red Jewel"/></div>`;
					break;
				case 192:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/FancyBox.png" alt="Fancy Box Green Jewel"/></div>`;
					break;
				case 193:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/FancyBox.png" alt="Fancy Box Blue Jewel"/></div>`;
					break;
				case 194:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/FancyBox.png" alt="Fancy Box Red Jewel"/></div>`;
					break;
				case 211:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/HospitalIDCard.png" alt="Hospital ID Card"/></div>`;
					break;
				case 212:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/TapePlayerTapeInserted.png" alt="Tape Player Tape Inserted"/></div>`;
					break;
				case 213:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/AudiocassetteTape.png" alt="Audiocassette Tape2"/></div>`;
					break;
				case 214:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/TapePlayer.png" alt="Tape Player"/></div>`;
					break;
				case 215:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/VaccineSample.png" alt="Vaccine Sample"/></div>`;
					break;
				case 217:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/Detonator.png" alt="Detonator2"/></div>`;
					break;
				case 218:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/LockerRoomKey.png" alt="Locker Room Key"/></div>`;
					break;
				case 222:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/Fuse3.png" alt="Fuse3"/></div>`;
					break;
				case 223:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/Fuse2.png alt="Fuse2"/></div>`;
					break;
				case 224:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/Fuse1.png" alt="Fuse1"/></div>`;
					break;
				case 231:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/" alt="Wristband"/></div>`;
					break;
				case 232:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/FlashDrive.png" alt="Flash Drive"/></div>`;
					break;
				case 233:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/Vaccine.png" alt="Vaccine"/></div>`;
					break;
				case 234:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/CultureSample.png" alt="Culture Sample"/></div>`;
					break;
				case 235:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/LiquidFilledTestTube.png" alt="Liquid-Filled Test Tube"/></div>`;
					break;
				case 236:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/VaccineBase.png" alt="Vaccine Base"/></div>`;
					break;
				case 264:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/FireHose.png" alt="Fire Hose2"/></div>`;
					break;
				case 301:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/IronDefenseCoin.png" alt="Iron Defense Coin"/></div>`;
					break;
				case 302:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/AssaultCoin.png" alt="Assault Coin"/></div>`;
					break;
				case 303:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/RecoveryCoin.png" alt="Recovery Coin"/></div>`;
					break;
				case 304:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/CraftingCompanion.png" alt="Crafting Companion"/></div>`;
					break;
				case 305:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/STARSFieldCombatManual.png" alt="STARS Field Combat Manual"/></div>`;
					break;
				case 311:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/SupplyCrate.png" alt="Supply Crate Extended Magazine Handgun"/></div>`;
					break;
				case 312:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/SupplyCrate.png" alt="Supply Crate Moderator Handgun"/></div>`;
					break;
				case 313:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/SupplyCrate.png" alt="Supply Crate Shotgun Shells"/></div>`;
					break;
				case 314:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/SupplyCrate.png" alt="Supply Crate Acid Rounds"/></div>`;
					break;
				case 315:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/SupplyCrate.png" alt="Supply Crate Flame Rounds"/></div>`;
					break;
				case 316:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Items/SupplyCrate.png" alt="Supply Crate Extended Barrel MAG"/></div>`;
					break;
			}
		} else if (PlayerInventory[i].IsWeapon) {
			switch (PlayerInventory[i].WeaponID) {
				case 1:
					if (PlayerInventory[i].Attachments == 1) {
						newData[
							PlayerInventory[i].SlotPosition
						] = `<div class="inventoryslot2"><img src="Weapons/G19Handgun1.png" alt="G19 Handgun"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					} 
					else if (PlayerInventory[i].Attachments == 2)
						newData[
							PlayerInventory[i].SlotPosition
						] = `<div class="inventoryslot"><img src="Weapons/G19Handgun2.png" alt="G19 Handgun"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					else if (PlayerInventory[i].Attachments == 3) {
						newData[
							PlayerInventory[i].SlotPosition
						] = `<div class="inventoryslot2"><img src="Weapons/G19Handgun3.png" alt="G19 Handgun"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					} 
					else if (PlayerInventory[i].Attachments == 4)
						newData[
							PlayerInventory[i].SlotPosition
						] = `<div class="inventoryslot"><img src="Weapons/G19Handgun4.png" alt="G19 Handgun"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					else if (PlayerInventory[i].Attachments == 5) {
						newData[
							PlayerInventory[i].SlotPosition
						] = `<div class="inventoryslot2"><img src="Weapons/G19Handgun5.png" alt="G19 Handgun"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					} 
					else if (PlayerInventory[i].Attachments == 6)
						newData[
							PlayerInventory[i].SlotPosition
						] = `<div class="inventoryslot"><img src="Weapons/G19Handgun6.png" alt="G19 Handgun"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					else if (PlayerInventory[i].Attachments == 7) {
						newData[
							PlayerInventory[i].SlotPosition
						] = `<div class="inventoryslot2"><img src="Weapons/G19Handgun7.png" alt="G19 Handgun"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					} 
					else
						newData[
							PlayerInventory[i].SlotPosition
						] = `<div class="inventoryslot"><img src="Weapons/G19Handgun.png" alt="G19 Handgun"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					break;
				case 2:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Weapons/G18BurstHandgun.png" alt="G18 Burst Handgun"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					break;
				case 3:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Weapons/G18Handgun.png" alt="G18 Handgun"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					break;
				case 4:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Weapons/SamuraiEdge.png" alt="Samurai Edge"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					break;
				case 7:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot2"><img src="Weapons/InfiniteMUPHandgun.png" alt="Infinite MUP Handgun"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					break;
				case 11:
					if (PlayerInventory[i].Attachments == 1) {
						newData[
							PlayerInventory[i].SlotPosition
						] = `<div class="inventoryslot2"><img src="Weapons/M3Shotgun1.png" alt="M3 Shotgun"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					} 
					else if (PlayerInventory[i].Attachments == 2) {
						newData[
							PlayerInventory[i].SlotPosition
						] = `<div class="inventoryslot"><img src="Weapons/M3Shotgun2.png" alt="M3 Shotgun"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					} 
					else if (PlayerInventory[i].Attachments == 3) {
						newData[
							PlayerInventory[i].SlotPosition
						] = `<div class="inventoryslot2"><img src="Weapons/M3Shotgun3.png" alt="M3 Shotgun"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					} 
					else if (PlayerInventory[i].Attachments == 4) {
						newData[
							PlayerInventory[i].SlotPosition
						] = `<div class="inventoryslot"><img src="Weapons/M3Shotgun4.png" alt="M3 Shotgun"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					} 
					else if (PlayerInventory[i].Attachments == 5) {
						newData[
							PlayerInventory[i].SlotPosition
						] = `<div class="inventoryslot2"><img src="Weapons/M3Shotgun5.png" alt="M3 Shotgun"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					} 
					else if (PlayerInventory[i].Attachments == 6) {
						newData[
							PlayerInventory[i].SlotPosition
						] = `<div class="inventoryslot"><img src="Weapons/M3Shotgun6.png" alt="M3 Shotgun"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					} 
					else if (PlayerInventory[i].Attachments == 7) {
						newData[
							PlayerInventory[i].SlotPosition
						] = `<div class="inventoryslot2"><img src="Weapons/M3Shotgun7.png" alt="M3 Shotgun"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					} 
					else {
						newData[
							PlayerInventory[i].SlotPosition
						] = `<div class="inventoryslot"><img src="Weapons/M3Shotgun.png" alt="M3 Shotgun"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					}
					break;
				case 21:
					if (PlayerInventory[i].Attachments == 1) {
						newData[
							PlayerInventory[i].SlotPosition
						] = `<div class="inventoryslot2"><img src="Weapons/CQBRAssaultRifle1.png" alt="CQBR Assault Rifle"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					} else if (PlayerInventory[i].Attachments == 2) {
						newData[
							PlayerInventory[i].SlotPosition
						] = `<div class="inventoryslot2"><img src="Weapons/CQBRAssaultRifle2.png" alt="CQBR Assault Rifle"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					} else if (PlayerInventory[i].Attachments == 3) {
						newData[
							PlayerInventory[i].SlotPosition
						] = `<div class="inventoryslot2"><img src="Weapons/CQBRAssaultRifle3.png" alt="CQBR Assault Rifle"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					} else if (PlayerInventory[i].Attachments == 4) {
						newData[
							PlayerInventory[i].SlotPosition
						] = `<div class="inventoryslot2"><img src="Weapons/CQBRAssaultRifle4.png" alt="CQBR Assault Rifle"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					} else if (PlayerInventory[i].Attachments == 5) {
						newData[
							PlayerInventory[i].SlotPosition
						] = `<div class="inventoryslot2"><img src="Weapons/CQBRAssaultRifle5.png" alt="CQBR Assault Rifle"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					} else if (PlayerInventory[i].Attachments == 6) {
						newData[
							PlayerInventory[i].SlotPosition
						] = `<div class="inventoryslot2"><img src="Weapons/CQBRAssaultRifle6.png" alt="CQBR Assault Rifle"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					} else if (PlayerInventory[i].Attachments == 7) {
						newData[
							PlayerInventory[i].SlotPosition
						] = `<div class="inventoryslot2"><img src="Weapons/CQBRAssaultRifle7.png" alt="CQBR Assault Rifle"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					} else {
						newData[
							PlayerInventory[i].SlotPosition
						] = `<div class="inventoryslot2"><img src="Weapons/CQBRAssaultRifle.png" alt="CQBR Assault Rifle"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					}
					break;
				case 22:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot2"><img src="Weapons/InfiniteCQBRAssaultRifle.png" alt="Infinite CQBR Assault Rifle"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					break;
				case 31:
					if (PlayerInventory[i].Attachments == 1) {
						newData[
							PlayerInventory[i].SlotPosition
						] = `<div class="inventoryslot"><img src="Weapons/LightningHawk1.png" alt="Lightning Hawk"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					} else {
						newData[
							PlayerInventory[i].SlotPosition
						] = `<div class="inventoryslot"><img src="Weapons/LightningHawk.png" alt="Lightning Hawk"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					}
					break;
				case 32:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot2"><img src="Weapons/RAIDEN.png" alt="RAI-DEN"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					break;
				case 42:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot2"><img src="Weapons/MGLGrenadeLauncher.png" alt="MGL Grenade Launcher"/>
<div class="ammo"><img src="Rounds/Explosive.png"/></div><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					break;
				case 46:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Weapons/CombatKnife.png" alt="Combat Knife"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					break;
				case 47:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Weapons/SurvivalKnife.png" alt="Survival Knife"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					break;
				case 48:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Weapons/HotDogger.png" alt="Hot Dogger"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					break;
				case 49:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot2"><img src="Weapons/RocketLauncher.png" alt="Infinite Rocket Launcher"/><div class="quantity">∞</div></div>`;
					break;
				case 65:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Weapons/HandGrenade.png" alt="Hand Grenade"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					break;
				case 66:
					newData[
						PlayerInventory[i].SlotPosition
					] = `<div class="inventoryslot"><img src="Weapons/FlashGrenade.png" alt="Flash Grenade"/><div class="quantity">${PlayerInventory[i].Quantity}</div></div>`;
					break;
				default:
					break;
			}
		}
		mainContainer.innerHTML = newData.join("\n");
	}
	mainContainer.innerHTML = newData.join("\n");
}

function clearData() {
	var mainContainer = document.getElementById("srtQueryData");
	mainContainer.innerHTML = "";
}