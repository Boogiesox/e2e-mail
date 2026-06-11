export type SearchFilters = {
  /** Search for matching text in email subject line */
  subject?: string;

  /** Search for emails to certain recipient
   * @example Useful for narrowing messages by email sub addressing. e.g. test-email+12345@example.com
   */
  recipient?: string;

  /** Search for emails from a particular sender address */
  sender?: string;

  /** Search for emails created after a specific date */
  createdAfter?: string;
};
