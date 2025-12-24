import { Instance, OnRoundStart } from "cs_script/point_script";

Instance.Msg("[xta] (inst)");

OnRoundStart(() => {
	Instance.SetTimeout(() => {
	    Instance.Msg("[xta] (5 sec)");
		const ring = FindEntityByName("ring_1");
		if (ring) {
	    	Instance.Msg("[xta] ring exists");
			ring.SetScale(10.0);
		}
	}, 5.0);
});