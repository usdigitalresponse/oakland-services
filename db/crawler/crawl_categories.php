<?php
/*
Read in list of subcategory IDs, crawl 211alamedacounty.org to collect subcategory list results, write subcategory list data to JSON file
How to execute from CLI:
php crawl_category.php[ -q][ --out="./#filepath_to_output_file#"][ --ids=""][ --sleep="#SECS#"]
-q (opt): Surpress debugging messages
--out (opt): file path to output JSON file; defaults to ./data/category_results.json
--ids (opt): Comma-delimited list of subcategory IDs from 211alamedacounty.org to crawl for resource lists; defaults to all subcategories listed below
--sleep (opt): Seconds between crawl calls to 211alamedacounty.org; defaults to 3 secs
*/
$options = getopt("q::", ["out::", "ids::", "sleep::"]);
$flag_silent = ($options["q"] === false) ? true : false;
$file_out = ($options["out"]) ? $options["out"] : "./data/category_results.json";
if ($options["ids"]) {
	$cat_arr = explode(",", $options["ids"]);
 } else {
	 // ids of all resources that you want to crawl
	// Crawl all subcategories
	$cat_arr = [5543, 5544, 5545, 5546, 5547, 5548, 5550, 5551, 5552, 5553, 5554, 5555, 5559, 5560, 3521, 3522, 5556, 5557, 5567, 5568, 5569, 5570, 5571, 5572, 5587, 5672, 5573, 5574, 5575, 5576, 5577, 5578, 5579, 5580, 5581, 5582, 5583, 5584, 5585, 5586, 5588, 5590, 6006, 5561, 5562, 5563, 5564, 5591, 5592, 5593, 5594, 5595, 5596, 5597, 5598, 5599, 5600, 5601, 5602, 5603, 5604, 5605, 5606, 5607, 5608, 5609, 5610, 5611, 5612, 5613, 5614, 5615, 5616, 5617, 5618, 5619, 5620, 5621, 5622, 5623, 5624, 5625, 5626, 5627, 5628, 5629, 5630, 5631, 5621, 5622, 5623, 5624, 5625, 5626, 5627, 5628, 5629, 5630, 5631, 5632, 5633, 5634, 5635, 5636, 5637, 5638, 5639, 5640, 5641, 5642, 5643, 5644, 5645, 5646, 5647, 5648, 5649, 5650, 5651, 5652, 5653, 5654, 5655, 5656, 5657, 5658, 5659, 5660, 5661, 5662, 5663, 5664, 5665, 5666, 5667, 5668, 5669, 5670, 5671, 6003, 6004];
	// Only crawl subcategories that we want to display
	// $cat_arr = [5547, 5548, 5550, 5551, 5552, 5553, 5554, 3521, 3522, 5556, 5557, 5567, 5568, 5569, 5570, 5571, 5572, 5587, 5573, 5574, 5575, 5576, 5577, 5578, 5579, 5580, 5583, 5584, 5585, 5586, 5588, 5590, 6006, 5561, 5562, 5563, 5564, 5591, 5592, 5593, 5594, 5595, 5596, 5597, 5598, 5599, 5600, 5601, 5602, 5603, 5604, 5605, 5606, 5607, 5612];
 }
$sleep = isset($options["out"]) ? intval($options["out"]) : 3; // secs between calls

$results_arr = [];

foreach ($cat_arr as $cat) {
	$timestamp = date("Y-m-d H:i:s");
	ob_start();
	// call curl simulating standard web browser, clean up data, append data to a category results array
	passthru("curl -sS 'https://na0apiv2.icarol.com/v2/Resource/Search/' -H 'authority: na0apiv2.icarol.com' -H 'accept: application/json, text/plain, */*' -H 'clientid: 2376' -H 'authorization: Bearer c05ad953-b2cc-4a9c-9be1-7dd1f755f3d8' -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36' -H 'db: 2376' -H 'content-type: application/json;charset=UTF-8' -H 'origin: https://prd.icarol.com' -H 'sec-fetch-site: same-site' -H 'sec-fetch-mode: cors' -H 'sec-fetch-dest: empty' -H 'referer: https://prd.icarol.com/index.html?token=c05ad953-b2cc-4a9c-9be1-7dd1f755f3d8&cssMode=Publish&orgNum=2376&db=2376&culture=en' -H 'accept-language: en-US,en;q=0.9' --data-binary '{\"Cache\":false,\"Token\":\"c05ad953-b2cc-4a9c-9be1-7dd1f755f3d8\",\"OrgNum\":\"2376\",\"Database\":[\"2376\"],\"SearchMode\":\"any\",\"LocationFilterMode\":\"1\",\"Term\":\"WIC\",\"SearchIndex\":\"2376-serving\",\"SearchLocation\":\"\",\"ScoringProfile\":\"geoScoring\",\"GuidedSearchItemId\":\"".$cat."\",\"Facets\":[\"state_province\",\"taxonomy_assigned\"],\"Culture\":\"en\",\"CustomFilter\":[],\"filter\":\"\"}' --compressed");
	$out = ob_get_clean();
	$out_arr = json_decode($out, TRUE);
	if (isset($out_arr["result"]) && isset($out_arr["result"]["results"]) && isset($out_arr["result"]["results"])) {
		foreach ($out_arr["result"]["results"] as $res) {
			if (isset($res["document"])) {
				$res["document"]["category"] = $cat;
				$res["document"]["last_scraped"] = gmdate("Y-m-d H:i:s", time());
				$results_arr[] = $res["document"];
			}
		}
		if(!$flag_silent) { echo "CAT: ".$cat.", #: ".count($out_arr["result"]["results"])."\n"; }
	} else {
		if(!$flag_silent) { echo "CAT: ".$cat.": NO RESULTS!\n"; }
	}
	sleep($sleep);
}

// Output to category_results. There may be a many-to-many relationship between resource ids and category ids which requires further cleanup
file_put_contents($file_out, json_encode($results_arr));
if(!$flag_silent) { echo "COMPLETE!\n"; }