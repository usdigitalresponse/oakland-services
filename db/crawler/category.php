<?php
// run "php category.php" from CLI
// input list of all subcategory ids that you want to crawl in $cat_arr from 211alamedacounty.org, outputs to a single JSON file in 'data' directory

// ids of all resources that you want to crawl
$cat_arr = [5547, 5548, 5550, 5551, 5552, 5553, 5554, 3521, 3522, 5556, 5557, 5567, 5568, 5569, 5570, 5571, 5572, 5587, 5573, 5574, 5575, 5576, 5577, 5578, 5579, 5580, 5583, 5584, 5585, 5586, 5588, 5590, 6006, 5561, 5562, 5563, 5564];
const SLEEPTIME= 3; // secs between calls

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
		echo "CAT: ".$cat.", #: ".count($out_arr["result"]["results"])."\n";
	} else {
		echo "CAT: ".$cat.": NO RESULTS!\n";
	}
	
	sleep(SLEEPTIME);
}

// Output to category_results. There may be a many-to-many relationship between resource ids and category ids which requires further cleanup
file_put_contents("./data/category_results.".gmdate("YmdHis", time()).".json", json_encode($results_arr));
echo "COMPLETE!\n";