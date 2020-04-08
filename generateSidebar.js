const _ = require('lodash');
const fs = require('fs');

// Note: A 'sidebar' is a Table of Contents for a specific SDK version.
// It offers navigation for all generated files from that version.

const { docs: latestTOC } = require('./sidebars.latest.js')
// const { docs: v0130TOC } = require('./sidebars.v0.13.0.js')
// const { docs: v0141TOC } = require('./sidebars.v0.14.1.js')
// const { docs: v0152TOC } = require('./sidebars.v0.15.2.js')
// TOBIN: We need to have all the sidebars from running npm run docs:md for each version 
// ready at this point

// This is the final destination file which contains sidebars for all SDK versions.
const dest = require('./sdkSidebar.json')

// Adds prefix to category items to match Docusaurus format
const formatCategory = (toc, category, version) => {
  return {
    type: "category",
    label: category,
    items: _.map(_.uniq(toc[category]), (x) => `comit-sdk/${version}/${x}`)
  };
}

// Adds prefix to all categories in a sidebar
const formatSidebar = (toc, version) => {
  let sidebar = _.map(_.keys(toc), (category) => formatCategory(toc, category, version));
  sidebar.unshift(`comit-sdk/${version}/index`);
  return sidebar;  
}

// Save new sidebars to file
const overwriteSidebars = (sidebars) => {
  const jsonContent = JSON.stringify(sidebars, null, 2);
  fs.writeFile("sdkSidebar.json", jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
    console.log("Sidebar JSON file has been overwritten.");
  });
}

// CONFIGURABLE
const sidebars = [
  {
    "type": "category",
    "label": "latest", // Sidebar for latest SDK version
    "items": formatSidebar(latestTOC, "latest") // Specify version here, should be same as folder name in e.g. '/comit-sdk/**latest**'
  },
  // TOBIN: Other versions can be added here, e.g.:
  // {
  //   "type": "category",
  //   "label": "v0.13.0", // Sidebar for latest SDK version
  //   "items": formatSidebar(v0130TOC, "v0.13.0") // Docs must be in '/comit-sdk/v0.13.0' for links to work
  // }
]
overwriteSidebars(sidebars);