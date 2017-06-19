export function convertINI(data) {

    var result = []

    // const result = document.querySelector("#results");

    var title, format, release_year, stars;

    var item = {};
    // console.log(data);

    data.split(/\n/) // split lines
        .map(line => line.replace(/^\s+|\r/g, "")) // cleanup whitespace
        .forEach(line => { // convert to object
            line = line.trim();
            //console.log(line);

            if (line) {



                var splitedkey = line.split(":")[0].replace(" ", "_").toLowerCase();
                var spliteval = line.split(":")[1];

                item[splitedkey] = spliteval;
                // console.log({
                //     splitedkey: spliteval
                // });
            } else {
                //  console.log(item);
                result.push(item)
                item = {}
            }
        });
    // console.log(result);
    return (result)
}

export function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const genreA = a.genre.toUpperCase();
  const genreB = b.genre.toUpperCase();

  let comparison = 0;
  if (genreA > genreB) {
    comparison = 1;
  } else if (genreA < genreB) {
    comparison = -1;
  }
  return comparison;
}
