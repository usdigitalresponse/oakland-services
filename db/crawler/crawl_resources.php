<?php
/*
Read in list of resource IDs, crawl 211alamedacounty.org to collect resoure data, write resource data to JSON file
How to execute from CLI:
php crawl_resources.php[ -q][ --in="./#filepath_to_input_file#"][ --out="./#filepath_to_output_file#"][ --ids=""][ --sleep="#SECS#"]
-q (opt): Surpress debugging messages
--in (opt): file path to input JSON file; defaults to ./data/category_resources.json
--out (opt): file path to output JSON file; defaults to ./data/resource_results.json
--ids (opt): Comma-delimited list of resource IDs from 211alamedacounty.org to crawl for resource details data; if empty, then read in resource IDs from --out file
--sleep (opt): Seconds between crawl calls to 211alamedacounty.org; defaults to 3 secs
*/

$options = getopt("q::", ["in::", "out::", "ids::", "sleep::"]);
$flag_silent = ($options["q"] === false) ? true : false;
$file_in = ($options["in"]) ? $options["in"] : "./data/category_results.json";
$file_out = ($options["out"]) ? $options["out"] : "./data/resource_results.json";
if ($options["ids"]) {
	$id_arr = explode(",", $options["ids"]);
} else {
	$id_arr = false;
}
$sleep = isset($options["out"]) ? intval($options["out"]) : 3; // secs between calls
if (!$id_arr) {
	$results_arr = json_decode(file_get_contents($file_in), true);
	$id_arr = [];
	foreach ($results_arr as $result) {
		if(isset($result['id'])) $id_arr[] = $result['id'];
	}
}
$id_arr = array_unique($id_arr);
$id_count = count($id_arr);
if(!$flag_silent) { echo "Total resources to crawl: ".$id_count."\n"; }

$resources_arr = [];

for($i=0; $i<$id_count; $i++) {
	$id = $id_arr[$i];
	if(!$flag_silent) { echo "Crawling: ".$i."/".$id_count.", Resource ID: ".$id."\n"; }
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
		// Intentionally unset "services" which duplicates all resource info for service provider
		unset($res["services"]);

		$new_res = [];
		$new_res = flatten_array($new_res, $res, false);

		$new_res["last_scraped"] = gmdate("Y-m-d H:i:s", time());
		$resources_arr[] = $new_res;
	} else {
		if(!$flag_silent) { echo "ID: ".$id.": NO DATA!\n"; }
	}
	sleep($sleep);
}
file_put_contents($file_out, json_encode($resources_arr));
if(!$flag_silent) { echo "COMPLETE!\n"; }

function flatten_array($arr, $inner_arr, $current_key) {
	if (is_array($inner_arr)) {
		foreach($inner_arr as $key => $value) {
			$new_key = $current_key ? $current_key."__".$key : $key;
			if(is_array($value)) {
				$arr = flatten_array($arr, $value, $new_key);
			} else {
				$arr[$new_key] = $value;
			}
		}
	}
	return $arr;
}