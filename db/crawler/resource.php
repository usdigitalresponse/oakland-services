<?php
$id_arr = [38905944, 38904199, 38906556, 38906205, 38907054, 64939674, 38903856, 38904147, 38904199, 38903821, 38903501, 51432403, 38904268, 38906300, 38904497, 38903542, 38906603, 38903542, 38906603, 38906530, 38905867, 38904147, 38903910, 38903902, 38904077, 38904238, 38904268, 38903910, 38903543, 38903810, 38903910, 38903810, 38905770, 38904641, 38903984, 38905875, 38904239, 38905118, 38905841, 38904239, 38903856, 38904001, 38906368, 38907272, 38905118, 38905841, 38904239, 38903856, 38904001, 38906368, 38907272, 38905118, 38905841, 38904239, 38903856, 38904001, 38906368, 38907272];

$results_arr = [];

foreach ($id_arr as $id) {
	$timestamp = date("Y-m-d H:i:s");
	ob_start();
	passthru("curl -sS 'https://na0apiv2.icarol.com/v2/Resource/Get/?id=".$id."&db=2376&clientAppContext=prd&culture=en' \
    -H 'authority: na0apiv2.icarol.com' \
    -H 'accept: application/json, text/plain, */*' \
    -H 'clientid: 2376' \
    -H 'authorization: Bearer c05ad953-b2cc-4a9c-9be1-7dd1f755f3d8' \
    -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36' \
    -H 'db: 2376' \
    -H 'content-type: application/json;charset=UTF-8' \
    -H 'origin: https://prd.icarol.com' \
    -H 'sec-fetch-site: same-site' \
    -H 'sec-fetch-mode: cors' \
    -H 'sec-fetch-dest: empty' \
    -H 'referer: https://prd.icarol.com/resourceview.html?id=".$id."&token=c05ad953-b2cc-4a9c-9be1-7dd1f755f3d8&cssMode=Publish&orgNum=2376&db=2376&culture=en' \
    -H 'accept-language: en-US,en;q=0.9' \
    --data-binary '{\"Token\":\"c05ad953-b2cc-4a9c-9be1-7dd1f755f3d8\",\"OrgNum\":\"2376\"}' \
    --compressed");
	$out = ob_get_clean();
	$res = json_decode($out, TRUE);
    if (isset($res["id"])) {
        unset($res["resource_info"]["language"]);
        unset($res["resource_info"]["custom_field_selection"]);
        unset($res["services"]);
        unset($res["service_at_locations"]);
        unset($res["locations"]);
        unset($res["service_area"]);
        unset($res["lanaguage"]);
        if (isset($res["contact"][0]) && isset($res["contact"][0])) $res["contact"] = $res["contact"][0];
        if (isset($res["physical_address"][0]) && isset($res["physical_address"][0])) $res["physical_address"] = $res["physical_address"][0];
        if (isset($res["postal_address"][0]) && isset($res["postal_address"][0])) $res["postal_address"] = $res["postal_address"][0];
        if (isset($res["phone"][0]) && isset($res["phone"][0])) $res["phone"] = $res["phone"][0];
        $res["last_scraped"] = gmdate("Y-m-d H:i:s", time());
        $results_arr[] = $res;
		echo "ID: ".$id."\n";
	} else {
		echo "ID: ".$id.": NO DATA!\n";
	}
	sleep(5);
}

file_put_contents("resource_results.".gmdate("YmdHis", time()).".json", json_encode($results_arr));
echo "COMPLETE!\n";
