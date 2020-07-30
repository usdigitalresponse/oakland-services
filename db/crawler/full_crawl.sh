#!/bin/bash
foldername=$(date +%Y%m%d%H%M%S)
`mkdir ./data/$foldername`
echo "Directory ./data/$foldername created"
echo "Running crawl_categories (about 5 minutes)..."
`php crawl_categories.php -1 --out="./data/$foldername/category_results.json"`
echo "Running crawl_resources (about 10 minutes)..."
`php crawl_resources.php -q --in="./data/$foldername/category_results.json" --out="./data/$foldername/resource_results.json"`
echo "Running clean_categorizations..."
`php clean_categorizations.php -q --in="./data/$foldername/category_results.json" --out="./data/$foldername/categorizations.csv"`
echo "WRITTEN TO: ./data/$foldername/categorizations.csv"
echo "Running clean_resources.php..."
`php clean_resources.php -q --in="./data/$foldername/resource_results.json" --out="./data/$foldername/resource_details.csv"`
echo "WRITTEN TO: ./data/$foldername/resource_details.csv"
echo "COMPLETE!"