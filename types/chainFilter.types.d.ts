interface ChainObject {
  /**
   * Starts a filter group to imitate the logical OR and resets the subsetArray.
   * @returns chainObject
   */
  startGroup(): ChainObject
  /**
   * Ends a filter group and sets the filteredArray to a set of the subsetArray.
   * @returns chainObject
   */
  endGroup(): ChainObject
  /**
   * Filters the base object or the already filtered array for the inclusion of a substring. The search is not case sensitive.
   * @param searchString - The string, which's inclusion will be checked.
   * @param active - Whether the filter should be run or not.
   * @param key - The key of the object which should be filtered.
   * @returns chainObject
   */
  filterText(searchString: string, active: boolean, key?: string): ChainObject
  /**
   * Filters the base object or the already filtered array for a match in a boolean value.
   * @param boolean - The string, which's inclusion will be checked.
   * @param active - Whether the filter should be run or not.
   * @param key - The key of the object which should be filtered.
   * @returns chainObject
   */
  filterBoolean(boolean: boolean, active: boolean, key?: string): ChainObject
  /**
   *
   * @param startDate - The start date of the filtering.
   * @param endDate - The end date of the filtering.
   * @param active - Whether the filter should be run or not.
   * @param key - The key of the object which should be filtered.
   * @returns chainObject
   */
  filterDateInterval(
    startDate: Date,
    endDate: Date,
    active: boolean,
    key: string
  ): ChainObject
  /**
   *
   * @param stringArray
   * @param active
   * @param key
   */
  filterTextArray(
    stringArray: string[],
    active: boolean,
    key: string
  ): ChainObject
  /**
   * Returns the filtered array.
   * @returns filteredArray
   */
  out(): any[]
  /**
   * Console logs the filtered array.
   * @returns chainObject
   */
  log(): ChainObject
}
