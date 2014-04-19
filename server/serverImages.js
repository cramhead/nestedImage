FS.debug = true;


// var imageStore = new FS.Store.FileSystem("images", {
//     path: "~/uploads",   
//     filter: {
//         maxSize: 104857600, //in bytes
//         allow: {
//             contentTypes: ['image/*'],
//             extensions: ['png', 'jpg', 'jpeg']
//         },
//         onInvalid: function(message) {
//             console.log(message);
//         }
//     }
// });

// var thumbStore = new FS.Store.FileSystem("thumbs", {
//     path: "~/thumbs",
//     beforeSave: function() {
//         console.log("before");
//     },
//     filter: {
//         maxSize: 104857600, //in bytes
//         allow: {
//             contentTypes: ['image/*'],
//             extensions: ['png', 'jpg', 'jpeg']
//         },
//         onInvalid: function(message) {
//             console.log(message);
//         }
//     }
// });
Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: "~/uploads"})]
});


Images.allow({
    insert: function(userId, file) {
        return true;
    },
    update: function(userId, files, fields, modifier) {
        return true;
    },
    remove: function(userId, files) {
        return true;
    },
    download: function(userId, file) {
        return true;
    }
});

// publish all items
Meteor.publish('items', function() {
    return Items.find();
});

/** do NOT publish the images as their refence is in each Item **/
Meteor.publish('images', function(){
 return Images.find();
});

if (Meteor.isServer) {
    Meteor.startup(function() {

        // Insert items seed data
        if (Items.find().count() === 0) {
            console.log("Adding sample items");

            var seeditems = ["Diecast Cars", "Watches", "Cameras", "Guitars"];
            for (var i = seeditems.length - 1; i >= 0; i--) {
                Items.insert({
                    name: seeditems[i],
                    creationDate: new Date()
                });
            }
        }
    });
}
