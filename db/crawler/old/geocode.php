<?php
include_once ('./private/KEYS.php');

// Translate tsv file into flat arr
$file = file_get_contents('./data/geocode.category_resource.tsv');
$data = str_getcsv($file, "\n");
foreach($data as $row) $raw_arr[] = str_getcsv($row, "\t");

$new_arr = [];
$latlong_arr = [];
foreach ($raw_arr as $row) {
    unset($arr);
    $arr['id'] = $row[0];
    if(strlen($row[1]) & strlen($row[2])) {
        $latlong = $row[1].",".$row[2];
        $arr['latlong'] = $latlong;
        if(!isset($latlong_arr[$latlong])) {
            $latlong_arr[$latlong] = get_address($latlong);
        }
        $arr['address'] = $latlong_arr[$latlong];
        $new_arr[] = $arr;
    }
    for($i=3; $i<=8; $i++) {
        if(isset($row[$i]) && strlen($row[$i])) {
            $new_latlong = str_replace(" ", "", $row[$i]);
            if($new_latlong!=$latlong) {
                unset($arr);
                $arr['id'] = $row[0];
                $arr['latlong'] = $new_latlong;
                if(!isset($latlong_arr[$new_latlong])) {
                    $latlong_arr[$new_latlong] = get_address($new_latlong);
                }
                $arr['address'] = $latlong_arr[$new_latlong];
                $new_arr[] = $arr;
            }
        }
    }
}

file_put_contents("./data/geocode.category_results.".gmdate("YmdHis", time()).".json", json_encode($new_arr));
echo "COMPLETE!\n";

function get_address($ll) {
    //return 'https://maps.googleapis.com/maps/api/geocode/json?latlng='.$ll.'&key='.GC_API_KEY;
    $geocode=file_get_contents('https://maps.googleapis.com/maps/api/geocode/json?latlng='.$ll.'&API&key='.GC_API_KEY);
    usleep(100000); // 0.1 secs
    return json_decode($geocode);
}
