# Crawler scripts
## full_crawl.sh
Run 'bash full_crawl.sh' from CLI 
It will create a timestamped directory in ./data dir, run each of the crawl PHP scripts sequentially, and write data files into the directory.

Or you can run the PHP scripts individually
### crawl_categories.php
Read in list of subcategory IDs, crawl 211alamedacounty.org to collect subcategory list results, write subcategory list data to JSON file
How to execute from CLI:
php crawl_category.php[ -q][ --out="./#filepath_to_output_file#"][ --ids=""][ --sleep="#SECS#"]
-q (opt): Surpress debugging messages
--out (opt): file path to output JSON file; defaults to ./data/category_results.json
--ids (opt): Comma-delimited list of subcategory IDs from 211alamedacounty.org to crawl for resource lists; defaults to all subcategories listed below
--sleep (opt): Seconds between crawl calls to 211alamedacounty.org; defaults to 3 secs

### crawl_resources.php
Read in list of resource IDs, crawl 211alamedacounty.org to collect resoure data, write resource data to JSON file
How to execute from CLI:
php crawl_resources.php[ -q][ --in="./#filepath_to_input_file#"][ --out="./#filepath_to_output_file#"][ --ids=""][ --sleep="#SECS#"]
-q (opt): Surpress debugging messages
--in (opt): file path to input JSON file; defaults to ./data/category_resources.json
--out (opt): file path to output JSON file; defaults to ./data/resource_results.json
--ids (opt): Comma-delimited list of resource IDs from 211alamedacounty.org to crawl for resource details data; if empty, then read in resource IDs from --out file
--sleep (opt): Seconds between crawl calls to 211alamedacounty.org; defaults to 3 secs

### clean_categorizations.php
Read in category_results.json, clean data and write CSV file containing pairs of "resource_id,subcategory_ID"
How to execute from CLI:
php clean_categorizations.php[ -q][ --in="./#filepath_to_input_file#"][[ --out="./#filepath_to_output_file#"]
-q (opt): Surpress debugging messages
--in (opt): file path to input JSON file; defaults to ./data/category_resources.json
--out (opt): file path to output JSON file; defaults to ./data/resource_results.json

### clean_resources.php
Read in resource_results.json, clean data and flatten embededed multidimensional arrays, and write CSV file
How to execute from CLI:
php clean_resources.php[ -q][ --in="./#filepath_to_input_file#"][ --neighborhoods="./#filepath_to_neighborhoods_data_file#"][ --ignore=""][ --out="./#filepath_to_output_file#"]
-q (opt): Surpress debugging messages
--in (opt): file path to input JSON file; defaults to ./data/category_resources.json
--neighborhoods (opt): file path to input csv file containing resource_id, neighborhood_id pairings; defaults to ./data/resource_neighborhood.csv
--ignore (opt): comma-delimited list of field name prefixes to exclude from data set (used for redundant embedding of multidimensional data); defaults to list below
--out (opt): file path to output JSON file; defaults to ./data/resource_results.json
