## Write a postmortem after every production incident

Every production incident should end with a written postmortem, including the small ones. The goal is a record that the next person on call can read at 3 a.m. without having lived through the outage.

A postmortem answers four questions: what users saw, when we noticed, what we did to recover, and why the system allowed the failure in the first place. The last question matters most. A restart fixes the symptom for today. The write-up is where we find the missing alert, the config nobody tested, or the deploy step that let a bad change reach everyone at once.

Small incidents deserve the same treatment. A five-minute blip that recurs three times in a month is often one underlying problem, and it only shows up as a pattern if each occurrence left a document behind. Without those documents, each person learns about the failure from memory, and memory is unreliable once the engineer who fixed it has moved on to other work.

The format does not need to be long. A page with a timeline, a cause, and a short list of follow-up tasks is enough. Each follow-up task gets an owner and a ticket. A postmortem with no tickets has not finished its job.
