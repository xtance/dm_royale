import { Instance } from "cs_script/point_script";

let count = 0;

Instance.Msg("[xta] (inst!)");

Instance.OnRoundStart(function () {
	count = 0;
	Instance.Msg("[xta] (round start!)");
	//Instance.SetTimeout(function () {
		Instance.Msg(`[xta] (5 sec!) ${Instance.GetGameTime()}`);
		let ring = Instance.FindEntityByName("ring_1");
		if (ring) {
			Instance.Msg("[xta] ring exists");
			ring.SetScale(10.0);
		}
	//}, 5.0);
});

Instance.OnScriptInput("each_second", function () {
	count++;
	Instance.Msg(`[xta] (each second = ${count}!)`);
});