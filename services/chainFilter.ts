/**
 * A chainable filter, with optional grouping capabilities and multiple filter types, which are togglable by state.
 * @param input - The base array that should be filtered.
 * @returns A filtered array.
 */
export const chainFilter = (input: any[]) => {
  /**
   * The array that should be filtered.
   */
  let filteredArray = input
  /**
   * An optional array used for storing filter results in a group.
   */
  let subsetArray: any[] = []
  /**
   * A flag which indicates whether the filter is grouped or not.
   */
  let isGrouped = false

  const chainObject: ChainObject = {
    startGroup() {
      isGrouped = true
      subsetArray = []
      return chainObject
    },
    endGroup() {
      isGrouped = false
      filteredArray = [...new Set(subsetArray.flat())]
      return chainObject
    },
    filterText(searchString: string, active: boolean, key: string) {
      if (
        active &&
        filteredArray.length !== 0 &&
        typeof filteredArray[0][key] === "string"
      ) {
        isGrouped
          ? subsetArray.push(
              filteredArray.filter((object) =>
                object[key].toLowerCase().includes(searchString.toLowerCase())
              )
            )
          : (filteredArray = filteredArray.filter((object) =>
              object[key].toLowerCase().includes(searchString.toLowerCase())
            ))
      }
      return chainObject
    },
    filterTextArray(textArray: string[], active: boolean, key: string) {
      if (
        active &&
        filteredArray.length !== 0 &&
        typeof filteredArray[0][key] === "string"
      ) {
        isGrouped
          ? subsetArray.push(
              filteredArray.filter((object) =>
                textArray.some((element) =>
                  object.name.toLowerCase().includes(element.toLowerCase())
                )
              )
            )
          : (filteredArray = filteredArray.filter((object) =>
              textArray.some((element) =>
                object.name.toLowerCase().includes(element.toLowerCase())
              )
            ))
      }
      return chainObject
    },
    filterBoolean(boolean: boolean, active: boolean, key: string) {
      if (active && filteredArray.length !== 0) {
        isGrouped
          ? subsetArray.push(
              filteredArray.filter((object) => object[key] === boolean)
            )
          : (filteredArray = filteredArray.filter(
              (object) => object[key] === boolean
            ))
      }
      return chainObject
    },
    filterDateInterval(
      startDate: Date,
      endDate: Date,
      active: boolean,
      key: string
    ) {
      if (active) {
        isGrouped
          ? subsetArray.push(
              filteredArray.filter(
                (object) =>
                  startDate <= new Date(object[key]) &&
                  endDate >= new Date(object[key])
              )
            )
          : (filteredArray = filteredArray.filter(
              (object) =>
                startDate <= new Date(object[key]) &&
                endDate >= new Date(object[key])
            ))
      }
      return chainObject
    },
    out() {
      return filteredArray
    },
    log() {
      console.log(filteredArray)
      return chainObject
    },
  }

  return chainObject
}
