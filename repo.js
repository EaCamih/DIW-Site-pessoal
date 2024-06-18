const my_token = '';

const params = new URL(document.location.href);
const queryOwner = params.searchParams.get("owner");
const queryName = params.searchParams.get("repo");

async function loadData() {
    const response = await fetch(`https://api.github.com/repos/${queryOwner}/${queryName}`, {
        method: 'GET',
        'headers': {
            'Authorization': `token ${my_token}`
        }
    });
    const data = await response.json();
    if(!data.name) return alert('Erro ao carregar informações do repositório!');
    
    document.getElementById('repoTitle').innerHTML = 'Reposiório: ' + data.name;
    document.getElementById('repoDesc').innerHTML = data.description || 'Repositório sem descrição.';

    const date = new Date(data.updated_at);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    document.getElementById('repoCreationDate').innerHTML = `${day}-${month}-${year}`;
    document.getElementById('repoMainLang').innerHTML = data.language || 'Linguagem não especificada.';
    document.getElementById('repoLink').href = data.html_url;
    document.getElementById('repoTopics').innerHTML = data.topics.join(', ') || 'Nenhum tópico especificado.';
    document.getElementById('repoStars').innerHTML = data.stargazers_count;
    document.getElementById('repoWatchers').innerHTML = data.watchers;

    document.getElementById('headerCommits').href = `${data.html_url}/commits`;
    document.getElementById('headerIssues').href = `${data.html_url}/issues`;
    document.getElementById('headerInsights').href = `${data.html_url}/graphs/contributors`;
}

window.onload = loadData;