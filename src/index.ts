import { pipeAsync } from './pipe';

const _fetchAndProcess = pipeAsync(
	(id: number) => fetch(`/api/users/${id}`),
	(response) => response.json(),
	async (_user) => ({ processed: true }),
	(test) => test,
);
