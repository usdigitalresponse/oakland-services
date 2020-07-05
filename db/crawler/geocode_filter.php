<?php
$arr = json_decode(file_get_contents('./data/geocode.category_results.20200705000403.json'), TRUE);
$arr_count = count($arr);
$results_arr = [];
for($i=0; $i<$arr_count; $i++) {
    // pull city
    if(isset($arr[$i]['address']['plus_code']['compound_code'])){
        if(strpos($arr[$i]['address']['plus_code']['compound_code'], 'Oakland')) {
            // Oakland-based resource
            unset($row);
            $row['id'] = $arr[$i]['id'];
            list($row['latitude'], $row['longitude']) = explode(",", $arr[$i]['latlong']);
            // find neighborhood
            foreach ($arr[$i]['address']['results'] as $res) {
                if ($res['types'][0] == 'street_address') {
                    $row['geocode_street_address'] = $res['formatted_address'];
                    //$row['geocode_street_address_components'] = $res['address_components'];
                }
                if ($res['types'][0] == 'neighborhood') {
                    $row['geocode_neighborhood'] = $res['address_components'][0]['short_name'];
                    //$row['geocode_neighborhood_components'] = $res['address_components'];
                }
            }
            $results_arr[] = $row;
        }
    }
}

// Output to category_results. There may be a many-to-many relationship between resource ids and category ids which requires further cleanup)
file_put_contents("./data/geocode_filter.".gmdate("YmdHis", time()).".json", json_encode($results_arr));
echo "COMPLETE!\n";