export type SearchFilters = {
  /** Search for matching text in email subject line */
  subject?: string;

  /** Search for emails to certain recipient
   * @remarks Useful for narrowing messages by uniquely sub addressing the same inbox. e.g. test-email+12345, test-email+45678
   */
  recipient?: string;

  /** Search for emails from a particular sender address */
  sender?: string;

  /** Search for emails created after a specific date */
  createdAfter?: string;
};
