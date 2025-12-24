import { Instance } from "cs_script/point_script";

let count = 0;

Instance.Msg("[xta] (inst!)");

Instance.OnRoundStart(function () {
	count = 0;
	Instance.Msg("[xta] (round start!)");
	//Instance.SetTimeout(function () {
		Instance.Msg(`[xta] (5 sec!) ${Instance.GetGameTime()}`);
		
	//}, 5.0);
});

Instance.OnScriptInput("each_second", function () {

	let previousRing = Instance.FindEntityByName(`ring${count}`);
	if (previousRing) {
		Instance.Msg(`[xta] previousRing exists`);
		previousRing.Kill();
	}

	count++;
	Instance.Msg(`[xta] (each second = ${count}!)`);
	//Instance.ServerCommand(`ent_create prop_dynamic {\"model\" \"models/props/de_train/hr_train_s2/train_hvac/train_hvac_24_snap_ring_01.vmdl\" \"modelscale\" \"2\"}`)
	// ent_create prop_dynamic {"model" "models/props/de_train/hr_train_s2/train_hvac/train_hvac_24_snap_ring_01.vmdl" "modelscale" "2"}

	Instance.ServerCommand(`ent_create prop_dynamic {\"targetname\" \"ring${count}\" \"model\" \"models/props/de_train/hr_train_s2/train_hvac/train_hvac_24_snap_ring_01.vmdl\" \"modelscale\" \"${count}\"}`);
	let ring = Instance.FindEntityByName(`ring${count}`);
	if (ring) {
		Instance.Msg(`[xta] ring exists`);
		ring.Teleport({ position: { x: -13300, y: 14660, z: 287 }});
	}
});