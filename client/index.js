//FS.debug = true;

Images = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images", {
        path: "~/uploads"
    })]
});

Template.item.events({
    'change .myFileInput': function(event, template) {
        var files = event.target.files;

        var insertCallback = function(err, id) {
            if (err) {
                console.log('Error ' + err.message);
            } else {
                console.log('Success ' + id);
            }
        };

        var userId = Meteor.userId();
        if (userId) {
            for (var i = 0, ln = files.length; i < ln; i++) {
                var fsFile = new FS.File(files[i]);
                fsFile.attachData(files[i]);

                fsFile.metadata = {
                    owner: userId
                };
                Images.insert(fsFile);
                addImageToItem(this._id, fsFile);

            }
        } else {
            alert("You must be logged in to insert a image");
        }
    }
});

var addImageToItem = function(itemId, image) {

    Items.update({
        _id: itemId
    }, {
        $addToSet: {
            images: image
        }
    }, {
        upsert: false,
        multi: false
    }, function(err, result) {
        if (err) {
            console.log('Error: ' + err.message);
        } else {
            console.log('Success: ' + result);
        }
    });
};

// does the data need to be made accessible to the template?
// Template.imageList.images = function(){
//   return Images.find();
// };


Template.home.items = function() {
    return Items.find({}, {
        sort: {
            creationDate: -1
        }
    });
};
