#!/usr/bin/env bash

SDK_DIR="../comit-js-sdk"
DEST_DIR="docs/comit-sdk/"

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

function generate_docs() { # Needs to take one `version` argument in $1
  echo "☺ Generating SDK docs."
  cd $SDK_DIR
  npm run docs:md
  # TODO: Needs to save the sidebar file to <some temporary directory> for generate_sidebar later
  cd -
}

# TOBIN: At this point, you need to have all the version's sidebars ready, from generate_docs
function generate_sidebar() {
  echo "☺ Generating updated sidebar."
  cp $SDK_DIR/website/sidebars.js $PWD/sidebars.latest.js
  # cp <some temporary directory> $PWD/sidebars.v0.13.0.js
  # cp <some temporary directory> $PWD/sidebars.v0.14.1.js
  # cp <some temporary directory> $PWD/sidebars.v0.15.0.js
  
  node ./generateSidebar.js

  rm $PWD/sidebars.latest.js
  # rm $PWD/sidebars.v0.13.0.js
  # rm $PWD/sidebars.v0.14.1.js
  # rm $PWD/sidebars.v0.15.0.js
}

# Copies generated Markdown docs to a directory in the comit.network site. (comit-sdk/*version*)
import_docs() { # Takes one `version` argument in $1
  echo "☺ Importing SDK docs."
  rm $SDK_DIR/docs/globals.md
  rm -rfv $DEST_DIR/$1 && mkdir $DEST_DIR/$1
  cp -R $SDK_DIR/docs/. $DEST_DIR/$1
}

# Main script
if sdk_exists; then
  generate_docs
  # TOBIN: You might need to extend this function to take in a tag e.g. generate_docs(v0.13.0)
  # generate_docs "latest"
  # generate_docs "v0.13.0"
  # ... for each version we want to publish on the website
fi

if docs_exists; then
  import_docs "latest"
  # TOBIN: You might need to extend this function to take in a tag e.g. import_docs(v0.13.0)
  # import_docs "latest"
  # import_docs "v0.13.0"
  # ... for each version we want to publish on the website

  # TOBIN: At this point, you should have all the sidebars.*version*.js ready to be processed. 
  # These files are generated whenever you run npm run docs:md and can be found in $SDK_DIR/website/sidebars.js.
  generate_sidebar

  echo "Finished."
fi
