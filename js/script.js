// Script for Books
// Code originally created and deleted the individual 
// element information, but after talking to Eric
// he gave me the idea to set up pre made paragraph
// tags for my cards and then using .text just overwrite
// what was already there so that it is easier to include
// other content.  

// My original code was correct, but this was about 
// half the code I used, and much easier to read.active

jQuery(document).ready(function() {});

function createBookListTitle(book) {
    var $li = $('<li>');                          // Creates a li element
    $li.addClass('ml-5 list-group-item hover-invert'); // Creates a class in li element
    $li.html(book.title);
    $li.data('bookId',book.id); // binds the id to the book title, then creates an id for it
    return $li;
}

var request = axios.get('https://csc225.mockable.io/books');
request.then(function(response) {
    $('#page-title').text('Books Library'); // Deletes the old text
    response.data.forEach(function(book) 
    {
        $('#book-list').append(createBookListTitle(book));
    });   
    //alert('it is fine');
    $('.list-group-item').click(function() {
        $('.list-group-item').removeClass('active');
        //$('p').remove('.listed');
        var bookId = $(this).data('bookId');
        $(this).addClass('active');
        $('#page-title').text('Loading...');
        //alert('it passes.'); 
        //alert('The book id is '+bookId);
        axios.get('https://csc225.mockable.io/books/' + bookId).then(function(response)
        {
            $('#page-title').text('Books Library');
            $('.card').show();
            $('#click-title').remove();
            $('#placeholder').remove();
            $('img').attr('src', response.data.cover).attr('alt', response.data.title);
             
            $('#book-title').text(response.data.title);     
            $('#book-author').text(response.data.author);      
            $('#book-country').text(response.data.country);          
            $('#book-language').text(response.data.language);           
            $('#book-year').text(response.data.year); 
            $('#book-pages').text(response.data.pages);       
            
            $('#link').attr('href', response.data.link);
        });
    });
});
