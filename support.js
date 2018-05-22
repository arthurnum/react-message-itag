const _filterUniq = (value, index, self) => {
    return self.indexOf(value) === index
}

const filterUniq = (array) => {
  return array.filter(_filterUniq)
}

module.exports = { filterUniq }
