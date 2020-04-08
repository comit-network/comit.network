const _ = require('lodash');
const fs = require('fs');

// Note: A 'sidebar' is a Table of Contents for a specific SDK version.
// It offers navigation for all generated files from that version.

// TODO: parameterize this input filepath
const { docs: TOC } = require('./sidebars.latest.js')

// TODO: parameterize this output filepath
const OUTPUT = "sdkSidebar.json";

// Adds prefix to category items to match Docusaurus format
const formatCategory = (toc, category) => {
  return {
    type: "category",
    label: category,
    items: _.map(_.uniq(toc[category]), (x) => `comit-sdk/${x}`)
  };
}

// Adds prefix to all categories in a sidebar
const formatSidebar = (toc) => {
  let sidebar = _.map(_.keys(toc), (category) => formatCategory(toc, category));
  sidebar.unshift(`comit-sdk/index`);
  return sidebar;
}

// Save new sidebars to file
const overwriteSidebar = (sidebar) => {
  const jsonContent = JSON.stringify(sidebar, null, 2);
  fs.writeFile(OUTPUT, jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
    console.log("Sidebar JSON file has been overwritten.");
  });
}

const sdkSidebar = formatSidebar(TOC);
overwriteSidebar(sdkSidebar);