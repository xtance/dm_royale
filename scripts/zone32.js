import { Instance } from "cs_script/point_script";

let maxCount = 300;
let minCount = 10;

let modelName = `models/props/de_nuke/hr_nuke/medium_silo_frame/medium_silo_frame.vmdl` //`models/anubis/trims/stone_trim_point_a.vmdl`;
let modelDiameter = 208; //144;

let magnetName = `magnet_`;
let minMagnet = 1;
let maxMagnet = 8;

let count = maxCount;
let prevCount = 0;
let position = { x: 0.0, y: 0.0, z: 0.0 };

function isPlayerInside(baseDiameter, multiplier, entX, entY, playerX, playerY) {
	const radius = (baseDiameter * multiplier) / 2;

	const dx = playerX - entX;
	const dy = playerY - entY;

	return (dx * dx + dy * dy) <= (radius * radius);
}

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function for10(cb) {
	for (let i = 1; i <= 3; i++) {
		cb(i);
	}
}


Instance.Msg("[xta] (inst!)");

Instance.OnRoundStart(function () {
	count = maxCount;
	let random = randomInt(minMagnet, maxMagnet);
	Instance.Msg(`[xta] (round start = ${random})`);
	let magnet = Instance.FindEntityByName(`${magnetName}${random}`);
	position = magnet ? magnet.GetAbsOrigin() : { x: 0.0, y: 0.0, z: 0.0 };
	Instance.Msg(`[xta] (abcdef position = (${position?.x} ${position?.y} ${position?.z}))`);
});

Instance.OnRoundEnd(function () {
	let players = Instance.FindEntitiesByClass("player");
	Instance.Msg(`[xta] array = ${players.length}`);
	for (let player of players) {
		Instance.Msg(`[xta] player !!!`);
		if (player.IsValid()) {
			player.Kill();
		}
	}
})


Instance.OnScriptInput("each_second", function () {
	// Instance.Msg("[xta] (each_second)");
	// let prevChanged = false;

	// for10(i => {
	// 	let ring = Instance.FindEntityByName(`ring_${count}_${i}`);
	// 	if (ring) {
	// 		Instance.Msg(`[xta] ring ${count} exists`);
	// 		ring.Teleport({ position: { x: position.x, y: position.y, z: position.z + (i * 256) }, angles: { pitch: /* 90 */0, yaw: 0, roll: 0 } });
	// 		ring.SetColor({ r: 0, g: 255, b: 0, a: 200 });
	// 		//ring.Glow({ r: 0, g: 255, b: 0, a: 255 });

	// 		if (prevCount !== count) {
	// 			let previousRing = Instance.FindEntityByName(`ring_${prevCount}_${i}`);
	// 			if (previousRing) {
	// 				Instance.Msg(`[xta] previousRing exists `);
	// 				previousRing.Kill();
	// 			}
	// 			prevChanged = true;
	// 		}
	// 	}
	// });

	// if (prevChanged) {
	// 	prevCount = count;
	// 	prevChanged = false;
	// }




	// let players = Instance.FindEntitiesByClass("player");
	// Instance.Msg(`[xta] array = ${players.length}`);

	// for (let player of players) {
	// 	Instance.Msg(`[xta] player !!!`);
	// 	if (player.IsValid() && (player.GetTeamNumber() === 2 || player.GetTeamNumber() === 3)) {
	// 		let pos = player.GetAbsOrigin();
	// 		if (pos) {
	// 			let inside = isPlayerInside(modelDiameter, count, position.x, position.y, pos.x, pos.y);
	// 			Instance.Msg(`[xta] ${pos.x},${pos.y},${pos.z} = ${inside}`);

	// 			if (!inside) {
	// 				let health = player.GetHealth();
	// 				if (health > 1) player.TakeDamage({ damage: 1 }); //player.SetHealth(health - 1);
	// 				else player.Kill();
	// 			}
	// 		}
	// 	}
	// }

});

Instance.OnScriptInput("each_10_second", function () {

	if (count > minCount) {
		Instance.Msg("[xta] (each_10_second)");
		count--;
		//Instance.ServerCommand(`ent_create prop_dynamic {\"targetname\" \"ring_${count}\" \"model\" \"models/props/de_train/hr_train_s2/train_hvac/train_hvac_24_snap_ring_01.vmdl\" \"modelscale\" \"${count}\" \"renderamt\" \"0\"}`);
		for10(i => {

			Instance.EntFireAtName({ name: `ring_${i}`, input: "SetScale", value: `${i}`, delay: 0.00 });

			//Instance.ServerCommand(`ent_create prop_dynamic {\"targetname\" \"ring_${count}_${i}\" \"model\" \"${modelName}\" \"modelscale\" \"${count}\" \"renderamt\" \"0\" \"disableshadows\" \"1\" }`); // 
		});
		//
	}
	//Instance.ServerCommand(`ent_create prop_dynamic {\"model\" \"models/props/de_train/hr_train_s2/train_hvac/train_hvac_24_snap_ring_01.vmdl\" \"modelscale\" \"2\"}`)
	// ent_create prop_dynamic {"model" "models/props/de_train/hr_train_s2/train_hvac/train_hvac_24_snap_ring_01.vmdl" "modelscale" "2"}

	// ent_create prop_dynamic {"targetname" "ring_" "model" "models/props/de_train/hr_train_s2/train_hvac/train_hvac_24_snap_ring_01.vmdl" "modelscale" "10"}

});