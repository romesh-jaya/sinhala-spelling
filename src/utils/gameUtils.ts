import { MAX_GAME_SLIDES } from '@/constants';

/**
 * Represents the structure of game data items
 */
export interface GameDataItem {
  imagePath: string;
  correctAnswer: string[];
  levelNum: number;
  audioPath: string;
}

/**
 * Shuffles an array using Fisher-Yates algorithm and returns a sliced set
 * of unique elements that haven't been shown for the current level.
 *
 * @param gameData - Array of game data items to shuffle
 * @param levelNum - Current level number
 * @returns Shuffled array of up to MAX_GAME_SLIDES unique elements
 */
export function shuffleArray<T extends GameDataItem>(gameData: T[], levelNum: number): T[] {
  // Get previously shown elements from localStorage
  const storageKey = `shownElements_level_${levelNum}`;
  const storedData = localStorage.getItem(storageKey);
  const shownIndices = storedData ? JSON.parse(storedData) : [];

  // Filter out elements that have already been shown
  const availableElements = gameData.filter((_, index) => !shownIndices.includes(index));

  // If all elements have been shown, reset and show all elements again
  if (availableElements.length === 0) {
    // Clear the localStorage for this level
    localStorage.removeItem(storageKey);
    // Use all game data
    const shuffled = shuffleArrayInternal(gameData);
    storeShownElements(gameData, levelNum);
    return shuffled.slice(0, MAX_GAME_SLIDES);
  }

  // Shuffle the available elements
  const shuffled = shuffleArrayInternal(availableElements);

  // Get up to MAX_GAME_SLIDES elements
  const selectedElements = shuffled.slice(0, MAX_GAME_SLIDES);

  // Store the indices of newly shown elements
  const selectedIndices = gameData
    .map((item, index) =>
      selectedElements.some(
        (el) =>
          el.imagePath === item.imagePath &&
          JSON.stringify(el.correctAnswer) === JSON.stringify(item.correctAnswer)
      )
        ? index
        : -1
    )
    .filter((index) => index !== -1);

  const updatedShownIndices = [...shownIndices, ...selectedIndices];
  localStorage.setItem(storageKey, JSON.stringify(updatedShownIndices));

  return selectedElements;
}

/**
 * Internal helper function to shuffle an array using Fisher-Yates algorithm
 *
 * @param array - Array to shuffle
 * @returns Shuffled copy of the array
 */
function shuffleArrayInternal<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * Helper function to store all shown element indices in localStorage
 * Used when resetting the level after all elements have been shown
 *
 * @param gameData - Array of game data items
 * @param levelNum - Current level number
 */
function storeShownElements<T extends GameDataItem>(gameData: T[], levelNum: number): void {
  const storageKey = `shownElements_level_${levelNum}`;
  const allIndices = gameData.map((_, index) => index);
  localStorage.setItem(storageKey, JSON.stringify(allIndices));
}

/**
 * Clears the localStorage record for a specific level
 * Useful for testing or resetting progress
 *
 * @param levelNum - Level number to clear
 */
export function clearLevelProgress(levelNum: number): void {
  const storageKey = `shownElements_level_${levelNum}`;
  localStorage.removeItem(storageKey);
}

/**
 * Clears all progress from localStorage
 * Useful for resetting the entire game
 */
export function clearAllProgress(): void {
  const keys = Object.keys(localStorage);
  keys.forEach((key) => {
    if (key.startsWith('shownElements_level_')) {
      localStorage.removeItem(key);
    }
  });
}
