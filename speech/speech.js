const say = require('say')
const CircleCI = require('circleci')
var player = require('play-sound')(opts = {})

const getUncheckedBuilds = async (maxAgeInSeconds, lastIdSeen) => {
    console.log(`About to fetch builds, last id seen ${lastIdSeen}`)
    const result = {
        found: false,
        build: null
    };

    var ci = new CircleCI({
        auth: "9b837217293c6b250aaa0bf55d2af217039821d0"
    });
    const recentBuilds = await ci.getRecentBuilds({
        limit: 5
    });
    for (let index = 0; index < recentBuilds.length; index++) {
        const build = recentBuilds[index];
        if (!['success', 'failed'].includes(build.status)) {
            continue;
        }

        if(build.build_num <= lastIdSeen){
            continue;
        }

        const buildDate = new Date(build.stop_time);
        const now = new Date();
        const buildAgeInSeconds = (now.getTime() - buildDate.getTime()) / 1000;
        
        console.log(build.build_num, build.status, buildAgeInSeconds);
        
        if (buildAgeInSeconds < maxAgeInSeconds) {
            result.found = true;
            result.build = build;
            break;
        }
    }
    
    return result;
};

const getAuthorName = (buildDetails) => {
    let result = 'Yoni Goldberg';

    for (let index = 0; index < buildDetails.length; index++) {
        const singleCommit = buildDetails[index];
        console.log(index, singleCommit.author_name);
        if (singleCommit.author_name != result) {
            result = singleCommit.author_name;
            break;
        }
    }

    return result;
}

const converBuildResultToTextMessage = (build) => {
    let readoutMessage = '';
    const authorName = getAuthorName(build.all_commit_details);
    if (build.status === 'success') {
        readoutMessage = `${authorName},   good work`
    } else {
        readoutMessage = `${authorName},   shame! Here is a Justin Bieber song for you  `
    }

    return readoutMessage;
}

const sayText = async (textToSay) => {
    return new Promise((resolve, reject) => {
        say.speak(textToSay, 'Samantha', 1.0, (err) => {
            console.log(err);
            resolve();
        })    
    });
    
}

const start = async () => {
       
    console.log('Starting');
    let lastIdSeen = 0;
    setInterval(async () => {
        console.log('Start checking builds');

        const uncheckedBuild = await getUncheckedBuilds(300, lastIdSeen);
        
        if (uncheckedBuild.found) {
            console.log('Found unchecked build');
            lastIdSeen = uncheckedBuild.build.build_num;
            const buildResultInText = converBuildResultToTextMessage(uncheckedBuild.build);
            console.log(`Text to say`, buildResultInText);
            await sayText(buildResultInText);
            player.play('justin.mp3', function(err){
                if (err){console.error(err)};
              })
        }
    }, 10000);
}

start();

// let voices = [{
//         voice: 'Alex',
//         text: 'Yoni Goldberg, shame. Test failed? Justin plays!'
//     },
//     {
//         voice: 'Yuna',
//         text: 'Yoni Goldberg, shame. Test failed? Justin plays!'
//     }
// ]

// sayIt(0)