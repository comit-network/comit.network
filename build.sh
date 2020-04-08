#!/usr/bin/env bash

# TODO: support versioning

SDK_DIR="../comit-js-sdk"
DEST_DIR="docs/comit-sdk/"
# TODO: DEST_DIR can be different if it's versioned_docs/*

function sdk_exists() {
  if [ -d $SDK_DIR ]; then
    echo "☺ comit-js-sdk found."
    return 0
  else
    echo "☹ ERROR: comit-js-sdk not found."
    return 1
  fi
}

function docs_exists() {
  if [ -d $SDK_DIR/docs ]; then
    echo "☺ SDK docs found."
    return 0
  else
    echo "☹ ERROR: SDK docs not found."
    return 1
  fi
}

# TODO: Needs to take one `version` argument in $1
function generate_docs() {
  echo "☺ Generating SDK docs."
  cd $SDK_DIR
  npm run docs:md
  # TODO: Needs to save the sidebar file to <some temporary directory> for generate_sidebar later
  cd -
}

# TODO: # Needs to take one `version` argument in $1
function generate_sidebar() { 
  echo "☺ Generating updated sidebar."
  cp $SDK_DIR/website/sidebars.js $PWD/sidebars.latest.js
  
  # TODO: May need to parameterize for versioned destination
  # TODO: DEST_DIR can be different if it's versioned_sidebars/*
  node ./generateSidebar.js

  rm $PWD/sidebars.latest.js
}

# TODO: Needs to take one `version` argument in $1
import_docs() {
  echo "☺ Importing SDK docs."
  rm $SDK_DIR/docs/globals.md
  rm -rfv $DEST_DIR && mkdir $DEST_DIR
  cp -R $SDK_DIR/docs/. $DEST_DIR/$1
}

# Main script
if sdk_exists; then
  generate_docs
fi

if docs_exists; then
  import_docs
  generate_sidebar
  echo "Finished."
fi
