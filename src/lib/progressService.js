import { supabase } from './supabase'

/**
 * Lädt den Lernfortschritt eines Benutzers
 * @param {string} userId - User ID
 * @returns {Object} Progress Daten (boxSystem, quizStats)
 */
export const loadUserProgress = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = Kein Eintrag gefunden (normal für neue User)
      throw error
    }

    return data || null
  } catch (err) {
    console.error('Fehler beim Laden des Fortschritts:', err)
    return null
  }
}

/**
 * Speichert den Lernfortschritt eines Benutzers
 * @param {string} userId - User ID
 * @param {Object} boxSystem - Leitner Box Daten
 * @param {Object} quizStats - Quiz Statistiken
 */
export const saveUserProgress = async (userId, boxSystem, quizStats) => {
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        box_system: boxSystem,
        quiz_stats: quizStats,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      })

    if (error) throw error
    return data
  } catch (err) {
    console.error('Fehler beim Speichern des Fortschritts:', err)
    throw err
  }
}

/**
 * Aktualisiert nur das Leitner-Box System
 * @param {string} userId - User ID
 * @param {Object} boxSystem - Leitner Box Daten
 */
export const updateBoxSystem = async (userId, boxSystem) => {
  try {
    // Lade aktuellen Progress
    const currentProgress = await loadUserProgress(userId)

    // Update mit neuem boxSystem
    await saveUserProgress(
      userId,
      boxSystem,
      currentProgress?.quiz_stats || { totalQuestions: 0, correctAnswers: 0 }
    )
  } catch (err) {
    console.error('Fehler beim Update des Box Systems:', err)
    throw err
  }
}

/**
 * Aktualisiert die Quiz-Statistiken
 * @param {string} userId - User ID
 * @param {number} totalQuestions - Gesamtzahl Fragen
 * @param {number} correctAnswers - Richtige Antworten
 */
export const updateQuizStats = async (userId, totalQuestions, correctAnswers) => {
  try {
    // Lade aktuellen Progress
    const currentProgress = await loadUserProgress(userId)

    // Update mit neuen Quiz Stats
    await saveUserProgress(
      userId,
      currentProgress?.box_system || {},
      { totalQuestions, correctAnswers }
    )
  } catch (err) {
    console.error('Fehler beim Update der Quiz Stats:', err)
    throw err
  }
}
