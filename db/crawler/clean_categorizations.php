<?php
/*
Read in category_results.json, clean data and write CSV file containing pairs of "resource_id,subcategory_ID"
How to execute from CLI:
php clean_categorizations.php[ -q][ --in="./#filepath_to_input_file#"][[ --out="./#filepath_to_output_file#"]
-q (opt): Surpress debugging messages
--in (opt): file path to input JSON file; defaults to ./data/category_resources.json
--out (opt): file path to output JSON file; defaults to ./data/resource_results.json
*/

$options = getopt("q::", ["in::", "out::"]);
$flag_silent = ($options["q"] === false) ? true : false;
$file_in = ($options["in"]) ? $options["in"] : "./data/category_results.json";
$file_out = ($options["out"]) ? $options["out"] : "./data/categorizations.csv";

$results_arr = json_decode(file_get_contents($file_in), true);
$id_arr = [];
foreach ($results_arr as $result) {
    if (isset($result['id']) && isset($result['category'])) {
        $id_arr[$result['id']][$result['category']] = true;
    }
}
$out = "\"resource_id\",\"category_id\"\n";
foreach($id_arr as $id => $j) {
    foreach($j as $cat => $k) {
        $out .= "\"".$id."\",\"".$cat."\"\n";
    }
}
file_put_contents($file_out, $out);
if(!$flag_silent) { echo "COMPLETE!\n"; }