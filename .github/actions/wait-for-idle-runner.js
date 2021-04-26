const { Octokit } = require("@octokit/action");

const octokit = new Octokit();

const NBR_ATTEMPTS = 3000;
const TIME_BETWEEN_ATTEMPTS_SECONDS = 5000;

async function is_runner_running () {
  for (var i=0; i < NBR_ATTEMPTS; i++) {
    const result = await octokit.request('GET /repos/Homebrew/homebrew-core/actions/runners')
    const { runners: [{ status, busy }] } = result.data
    if (busy == false) {
      // Return "true" once the self-hosted runner is not busy anymore
      console.log("true");
      break;
    }

    await new Promise(resolve => setTimeout(resolve, TIME_BETWEEN_ATTEMPTS_SECONDS));
  }
}

is_runner_running()
