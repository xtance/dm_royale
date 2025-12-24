import { Instance, OnRoundStart } from "cs_script/point_script";

Instance.Msg("[xta] (inst)");

OnRoundStart(function () {
Instance.Msg("[xta] (round start)");
	Instance.SetTimeout(function () {
	    Instance.Msg("[xta] (5 sec)");
		let ring = FindEntityByName("ring_1");
		if (ring) {
	    	Instance.Msg("[xta] ring exists");
			ring.SetScale(10.0);
		}
	}, 5.0);
});