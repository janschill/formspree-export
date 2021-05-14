function getText(node) {
  function recursor(n) {
    var i, a = [];
    if (n.nodeType !== 3) {
        if (n.childNodes)
             for (i = 0; i < n.childNodes.length; ++i)
                 a = a.concat(recursor(n.childNodes[i]));
      } else
          a.push(n.data);
      return a;
  }
  return recursor(node);
}

function extractTable () {
  const data = []
  const $tableHeader = document.querySelector('.rt-thead.-header')
  const $tableColumns = $tableHeader.querySelectorAll('.rt-th')

  const $rows = document.querySelectorAll('.rt-tr-group')

  for (let i = 0; i < $rows.length; i++) {
    const $row = $rows[i];
    const row = {}
    const $columns = $row.querySelectorAll('.rt-td')
    for (let j = 0; j < $columns.length; j++) {
      const $column = $columns[j];
      const key = getText($tableColumns[j])[0]
      const value = getText($column)[0]
      row[key] = value
    }
    data.push(row)
  }
  return data
}

function prepareForDye(table) {
  return table.map(row => {
    const names = row['name'].split(', ')
    const firstNames = names.map(name => name.split(' ')[0])
    return {
      "teamName": row['team-name'],
      "teamMembers": firstNames,
      "wins": 0,
      "losses": 0
    }
  })
}

let table = extractTable()
let cleanData = prepareForDye(table)
console.log(cleanData)
