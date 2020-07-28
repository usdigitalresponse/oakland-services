<?php
/*
Read in resource_results.json, clean data and flatten embededed multidimensional arrays, and write CSV file
How to execute from CLI:
php clean_resources.php[ -q][ --in="./#filepath_to_input_file#"][ --neighborhoods="./#filepath_to_neighborhoods_data_file#"][ --ignore=""][ --out="./#filepath_to_output_file#"]
-q (opt): Surpress debugging messages
--in (opt): file path to input JSON file; defaults to ./data/category_resources.json
--neighborhoods (opt): file path to input csv file containing resource_id, neighborhood_id pairings; defaults to ./data/resource_neighborhood.csv
--ignore (opt): comma-delimited list of field name prefixes to exclude from data set (used for redundant embedding of multidimensional data); defaults to list below
--out (opt): file path to output JSON file; defaults to ./data/resource_results.json
*/

$options = getopt("q::", ["in::", "neighborhoods::", "ignore::", "out::"]);
$flag_silent = ($options["q"] === false) ? true : false;
$file_in = ($options["in"]) ? $options["in"] : "./data/resource_results.json";
$file_neigborhoods = ($options["neighborhoods"]) ? $options["neighborhoods"] : "./data/resource_neighborhood.csv";
if ($options["ignore"]) {
	$ignore_fields = explode(",", $options["ignore"]);
} else {
	$ignore_fields = ["id", "last_scraped", "service__", "service_at_locations", "services__", "locations__0__resource_info", "locations__0__resource_info", "locations__1__resource_info", "locations__2__resource_info", "locations__3__resource_info", "locations__4__resource_info", "locations__5__resource_info", "locations__6__resource_info", "locations__7__resource_info", "locations__8__resource_info", "locations__9__resource_info", "lanaguage__", "location__"];
}
$file_out = ($options["out"]) ? $options["out"] : "./data/resource_details.csv";

$rs_arr = json_decode(file_get_contents($file_in), true);


// iterate through each row to obtain all fields
$orig_fields_arr = [];
foreach ($rs_arr as $rs) {
    foreach($rs as $key => $j) {
        $orig_fields_arr[$key] = true;
    }
    
}

// remove fields to ignore from fields array
$fields_arr = [];
foreach( $orig_fields_arr as $key => $j) {
    reset($ignore_fields);
    $flag_include = false;
    foreach($ignore_fields as $field) {
        if(strpos($key, $field) === 0) $flag_include = true;
    }
    if(!$flag_include) $fields_arr[] = $key;
}
sort($fields_arr);

// Instantiate resource-neighborhood mappings
$rs_nh_arr = [];
if (($fh = fopen($file_neigborhoods, "r")) !== FALSE) {
    while (($data = fgetcsv($fh)) !== FALSE) {
        $rs_nh_arr[$data[0]] = $data[1];
    }
    fclose($fh);
}

$out = "\"id\",\"serves_oakland\",\"neighborhood_id\",\"".implode($fields_arr, "\",\"")."\",\"last_scraped\"\n";

reset($rs_arr);
foreach($rs_arr as $rs) {
    $out .= "\"".$rs['id']."\"";
    // determine if coverage area includes Oakland
    $out .= ($rs['resource_info__coverage_area'] == "CA - Alameda County" || strpos($rs['resource_info__coverage_area'], "CA - Alameda County - Oakland") !== false) ? ",\"true\"" : ",\"false\"";
    $out .= ($rs_nh_arr[$rs['id']]) ? ",\"".$rs_nh_arr[$rs['id']]."\"" : ",\"\"";
    reset($fields_arr);
    foreach($fields_arr as $field) {
        $out .= ",\"".str_replace(["\r","\n","\""], ["", "\\n","\\\""], $rs[$field])."\"";
    }
    $out .= ",\"".$rs['last_scraped']."\"\n";
}
file_put_contents($file_out, $out);
if(!$flag_silent) { echo "COMPLETE!\n"; }