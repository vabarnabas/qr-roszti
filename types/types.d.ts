/**
 * The type for a User's role.
 */
type UserRole = "MEMBER" | "ADMIN"

interface User {
  /**
   * The unique identifier of the User.
   */
  id: string
  googleid: string
  /**
   * The role of the User.
   */
  role: UserRole
  /**
   * The visible name of the User.
   */
  displayname: string
  /**
   * The e-mail address of the User
   */
  email: string
  /**
   * The date of the Users's creation.
   */
  createdat: Date
  /**
   * The RÖszTI code of the User.
   */
  code: string
}

interface Event {
  /**
   * The unique identifier of the Event.
   */
  id: string
  /**
   * The visible name of the Event.
   */
  displayname: string
  /**
   * The User who created the Event.
   */
  createdby: string
  /**
   * The description of the Event.
   */
  description: string
  /**
   * The location of the Event in plain text format.
   */
  eventlocation: string
  /**
   * The type of the Event.
   */
  eventtype: string
  /**
   * The deadline to join the Event.
   */
  deadline: Date
  /**
   * The date of the Event.
   */
  eventdate: Date
  /**
   * The date of the Event's creation.
   */
  createdat: Date
}
