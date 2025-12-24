import { Instance } from "cs_script/point_script";

let count = 0;
let prevCount = -1;
let position = { x: 0.0, y: 0.0, z: 0.0 };

Instance.Msg("[xta] (inst!)");

Instance.OnRoundStart(function () {
	count = 0;
	Instance.Msg("[xta] (round start!)");

	let magnet = Instance.FindEntityByName(`magnet_1`);
	position = magnet ? magnet.GetAbsOrigin() : { x: 0.0, y: 0.0, z: 0.0 };
	Instance.Msg(`[xta] (abcde position = (${position?.x} ${position?.y} ${position?.z}))`);
});

Instance.OnScriptInput("each_second", function () {
	Instance.Msg("[xta] (each_second)");

	if (prevCount !== count) {
		prevCount = count;
		let ring = Instance.FindEntityByName(`ring_${count}`);
		if (ring) {
			Instance.Msg(`[xta] ring ${count} exists`);
			ring.Teleport({ position: position, angles: { x: 45, y: 45, z: 90 } });
			ring.SetColor({ r: 255, g: 0, b: 0, a: 255 });
			ring.Glow({ r: 255, g: 0, b: 0, a: 255 });
		}
	}
});

Instance.OnScriptInput("each_10_second", function () {

	
	Instance.Msg("[xta] (each_10_second)");


	let previousRing = Instance.FindEntityByName(`ring_${count}`);
	if (previousRing) {
		Instance.Msg(`[xta] previousRing exists `);
		previousRing.Kill();
	}

	count++;
	Instance.ServerCommand(`ent_create prop_dynamic {\"targetname\" \"ring_${count}\" \"model\" \"models/props/de_train/hr_train_s2/train_hvac/train_hvac_24_snap_ring_01.vmdl\" \"modelscale\" \"${count}\" \"renderamt\" \"0\"}`);

	//Instance.ServerCommand(`ent_create prop_dynamic {\"model\" \"models/props/de_train/hr_train_s2/train_hvac/train_hvac_24_snap_ring_01.vmdl\" \"modelscale\" \"2\"}`)
	// ent_create prop_dynamic {"model" "models/props/de_train/hr_train_s2/train_hvac/train_hvac_24_snap_ring_01.vmdl" "modelscale" "2"}

	// ent_create prop_dynamic {"targetname" "ring_" "model" "models/props/de_train/hr_train_s2/train_hvac/train_hvac_24_snap_ring_01.vmdl" "modelscale" "10"}

});