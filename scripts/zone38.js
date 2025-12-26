import { Instance } from "cs_script/point_script";

let maxCount = 200;
let minCount = 10;
let moves = 0;

// 200 sec = 3.3 min

let modelName = `models/props/de_nuke/hr_nuke/medium_silo_frame/medium_silo_frame.vmdl` //`models/anubis/trims/stone_trim_point_a.vmdl`;
let modelDiameter = 256; //144;

let magnetName = `magnet_`;
let minMagnet = 1;
let maxMagnet = 8;

let count = maxCount;
let prevCount = 0;
let position = { x: 0.0, y: 0.0, z: 0.0 };
let isRoundEnd = false;

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
	//for (let i = 1; i <= 1; i++) {
	cb(1);
	//}
}


Instance.Msg("[xta] (inst!)");

Instance.OnRoundStart(function () {
	isRoundEnd = false;
	count = maxCount;
	moves = 0;
	let random = randomInt(minMagnet, maxMagnet);
	Instance.Msg(`[xta] (round start = ${random})`);
	let magnet = Instance.FindEntityByName(`${magnetName}${random}`);
	position = magnet ? magnet.GetAbsOrigin() : { x: 0.0, y: 0.0, z: 0.0 };
	Instance.Msg(`[xta] (abcdef position = (${position?.x} ${position?.y} ${position?.z}))`);
});

Instance.OnRoundEnd(function () {
	isRoundEnd = true;
});

Instance.OnScriptInput("each_second", function () {

	let players = Instance.FindEntitiesByClass("player");
	Instance.Msg(`[xta] (each_second), array = ${players.length}`);

	if (isRoundEnd) {
		for (let player of players) {
			if (player && player.IsValid()) {
				player.Kill();
			}
		}
		return;
	}



	if (count > minCount) {
		count -= 0.1;
		//Instance.ServerCommand(`ent_create prop_dynamic {\"targetname\" \"ring_${count}\" \"model\" \"models/props/de_train/hr_train_s2/train_hvac/train_hvac_24_snap_ring_01.vmdl\" \"modelscale\" \"${count}\" \"renderamt\" \"0\"}`);
		for10(i => {
			let ring = Instance.FindEntityByName(`ring_${i}`);
			if (ring) {
				Instance.Msg(`[xta] ring ${i} exists`);
				ring.Teleport({ position: { x: position.x, y: position.y, z: position.z + (i * 512) }, angles: { pitch: /* 90 */0, yaw: 0, roll: 0 } });
				ring.SetColor({ r: 255, g: 255, b: 255, a: 200 });
				//ring.Glow({ r: 0, g: 255, b: 0, a: 255 });

				Instance.EntFireAtTarget({ target: ring, input: "SetScale", value: `${count}`, delay: 0.00 });
			}
		});
	}

	
	moves += 1;
	if (moves % 10 === 0){
		for (let player of players) {
			Instance.Msg(`[xta] player !!!`);
			if (player.IsValid() && (player.GetTeamNumber() === 2 || player.GetTeamNumber() === 3)) {
				let pos = player.GetAbsOrigin();
				if (pos) {
					let inside = isPlayerInside(modelDiameter, count, position.x, position.y, pos.x, pos.y);
					Instance.Msg(`[xta] ${pos.x},${pos.y},${pos.z} = ${inside}`);

					if (!inside) {
						let health = player.GetHealth();
						if (health > 1) player.TakeDamage({ damage: 1 }); //player.SetHealth(health - 1);
						else player.Kill();
					}
				}
			}
		}
	}
	//Instance.ServerCommand(`ent_create prop_dynamic {\"model\" \"models/props/de_train/hr_train_s2/train_hvac/train_hvac_24_snap_ring_01.vmdl\" \"modelscale\" \"2\"}`)
	// ent_create prop_dynamic {"model" "models/props/de_train/hr_train_s2/train_hvac/train_hvac_24_snap_ring_01.vmdl" "modelscale" "2"}

	// ent_create prop_dynamic {"targetname" "ring_" "model" "models/props/de_train/hr_train_s2/train_hvac/train_hvac_24_snap_ring_01.vmdl" "modelscale" "10"}

});