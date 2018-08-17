var d = {
  "title": "La Divina Commedia",
  "author": "Dante Alighier",
  "year": "1308-1320",
  "lang": "IT",
  "cantica": [
    {
      "title": "Inferno",
      "canto": [
        {
          "number": 1,
          "title": "Canto I",
          "tercet": [
            {
              "number": 1,
              "lines": [
                {
                  "line_number": 1,
                  "text": "Nel mezzo del cammin di nostra vita\n",
                  "chars": 36,
                  "last_word": "vita",
                  "rhyme_length": 0,
                  "rhyme": "ita",
                  "color": "rgba(162, 63, 234, 1)"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

function parse_text_tree(text_tree) {
  text_tree.unit_type = 'text';
  parse_unit(text_tree, 0, []);
}
function parse_unit(unit, unit_index, ancestors) {
  process_unit(unit, unit_index, ancestors);
  ancestors = ancestors.slice()
  ancestors.unshift(unit);
  $.each(unit, function(k, v) {
    if (Array.isArray(v)) {
      $.each(v, function(i, child) {
        child.unit_type = k;
        parse_unit(child, i, ancestors);
      });
    }
  });
};

function process_unit(unit, unit_index, ancestors) {
  
  console.log("------");
  console.log("I'm a "+unit.unit_type+" unit.");
  console.log("Depth: "+ancestors.length);
  if (ancestors.length) {
    var parent = ancestors[0];
    console.log("My parent unit is a: "+parent.unit_type);
  }
  if (unit.title) {
    console.log("My title is "+unit.title);
  }
  if (unit.unit_type == 'lines') {
    console.log('Line = '+unit.text)
  }
  
}

parse_text_tree(d);



