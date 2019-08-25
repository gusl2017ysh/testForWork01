$(document).ready(() => {
  // alert("ddddd");
  console.log("flow 1");

  let page = 1;
  let term = '';
  $("#test1").select2({
    placeholder:"this is placeholder",
    ajax: {
      url: "https://yts.lt/api/v2/list_movies.json",
      dataType: 'json',
      delay: 1000,
      data: params => {
        // ajax data
        
        const _page = 
        params.term ? 
          params.term !== term ? 1 
          : term + 1
        : term + 1;
        
        const _params = {}
        if (_page) {
          // page
          _params.page = _page;
        }
        if (params.term) {
          // searching string
          _params.query_term = params.term;
        }

        return _params;
      },
      processResults: function(data) {
        console.log(data);

        let options = [];
        if (data.data.movie_count > 0) {

          // modifying data
          options = 
          data.data.movies.map(movie => {
            return {
              id: movie.id,
              text: movie.title
            };
          });
        }

        return {
          results: options,
          pagination: { 
            more: data.data.movie_count > 0 // -> offsetだろうがナンだろうが必要
          }
        };
      }
    },
    // matcher: (params, data) => {
    //   console.log(params);
    //   console.log(params);
    //   debugger;
    // }

  })
  .on('select2:select', e => {
    
    debugger
    console.log(e);

  })
  .on('select2:open', e => {
    
    debugger
    console.log(e);

  })
  .on('select2:unselect', e => {
    
    debugger
    console.log(e);

  })
  .on('select2:clear', e => {
    
    debugger
    console.log(e);

  })




})


$("#testBtn").on("click", e => {
  console.log("fffff");
});

const testFunc = () => {
  console.log("fffffffffffff");
}
$(document).on("click", "#testBtn", testFunc)
