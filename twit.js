var data = eval("(" + stash.params.payload + ")");
var last_commits_index = data.commits.length - 1;
var last_message = data.commits[last_commits_index].message,
    repoName = data.repository.name,
    repoURL = data.repository.url;
var message = ["", repoName, "Pushed:", last_message, ":", repoURL].join(" ");

var res = http({
	method: "post",
	url: "http://twitter.com/statuses/update.json",
	data: http.data({ status : message }),
	headers : {
		Authorization : "Basic " + util.base64.encode(
			[stash.config.twitter_user, stash.config.twitter_pass].join(":")
		)
	}
}).code;

[res, "ref:", data.ref, "lastMessage:", last_message].join(" ");
