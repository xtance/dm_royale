import { Instance } from "cs_script/point_script";

let maxcount = 100;
let mincount = 10;

let count = maxcount;
let prevCount = 0;
let position = { x: 0.0, y: 0.0, z: 0.0 };

function isPlayerInside(baseDiameter, multiplier, entX, entY, playerX, playerY) {
	const radius = (baseDiameter * multiplier) / 2;

	const dx = playerX - entX;
	const dy = playerY - entY;

	return (dx * dx + dy * dy) <= (radius * radius);
}


Instance.Msg("[xta] (inst!)");

Instance.OnRoundStart(function () {
	count = maxcount;
	Instance.Msg("[xta] (round start!)");

	let magnet = Instance.FindEntityByName(`magnet_1`);
	position = magnet ? magnet.GetAbsOrigin() : { x: 0.0, y: 0.0, z: 0.0 };
	Instance.Msg(`[xta] (abcdef position = (${position?.x} ${position?.y} ${position?.z}))`);
});

Instance.OnScriptInput("each_second", function () {
	Instance.Msg("[xta] (each_second)");



	let ring = Instance.FindEntityByName(`ring_${count}`);
	if (ring) {
		Instance.Msg(`[xta] ring ${count} exists`);
		ring.Teleport({ position: position, angles: { pitch: /* 90 */0, yaw: 0, roll: 0 } });
		ring.SetColor({ r: 0, g: 255, b: 0, a: 150 });
		ring.Glow({ r: 0, g: 255, b: 0, a: 255 });

		if (prevCount !== count) {

			let previousRing = Instance.FindEntityByName(`ring_${prevCount}`);
			if (previousRing) {
				Instance.Msg(`[xta] previousRing exists `);
				previousRing.Kill();
			}

			prevCount = count;
		}
	}

	let players = Instance.FindEntitiesByClass("player");
	Instance.Msg(`[xta] array = ${players.length}`);

	for (let player of players) {
		Instance.Msg(`[xta] player !!!`);
		let pos = player.GetAbsOrigin();
		if (pos) {
			let inside = isPlayerInside(144/* 25 */, count, position.x, position.y, pos.x, pos.y);
			Instance.Msg(`[xta] ${pos.x},${pos.y},${pos.z} = ${inside}`);

			player.SetHealth(inside ? 100 : Math.max(0, player.GetHealth() - 1));
		}

	}

});

Instance.OnScriptInput("each_10_second", function () {

	if (count > mincount) {


		Instance.Msg("[xta] (each_10_second)");
		count--;
		//Instance.ServerCommand(`ent_create prop_dynamic {\"targetname\" \"ring_${count}\" \"model\" \"models/props/de_train/hr_train_s2/train_hvac/train_hvac_24_snap_ring_01.vmdl\" \"modelscale\" \"${count}\" \"renderamt\" \"0\"}`);
Instance.ServerCommand(`ent_create prop_dynamic {\"targetname\" \"ring_${count}\" \"model\" \"models/anubis/trims/stone_trim_point_a.vmdl\" \"modelscale\" \"${count}\"}`); // \"renderamt\" \"0\"
//
	}
	//Instance.ServerCommand(`ent_create prop_dynamic {\"model\" \"models/props/de_train/hr_train_s2/train_hvac/train_hvac_24_snap_ring_01.vmdl\" \"modelscale\" \"2\"}`)
	// ent_create prop_dynamic {"model" "models/props/de_train/hr_train_s2/train_hvac/train_hvac_24_snap_ring_01.vmdl" "modelscale" "2"}

	// ent_create prop_dynamic {"targetname" "ring_" "model" "models/props/de_train/hr_train_s2/train_hvac/train_hvac_24_snap_ring_01.vmdl" "modelscale" "10"}

});