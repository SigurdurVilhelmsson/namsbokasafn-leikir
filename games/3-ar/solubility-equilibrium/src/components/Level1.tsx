/**
 * Level 1: Ksp Expressions and Solubility Comparison
 *
 * Students learn to:
 * 1. Write Ksp expressions from dissolution equations
 * 2. Compare solubility of compounds using Ksp values
 */

import { useState, useCallback } from 'react';
import { useI18n } from '@shared/hooks/useI18n';
import { HintSystem } from '@shared/components';
import type { Level1Challenge, IonicCompound } from '../types';
import { level1Challenges, formatKspExpression, calculateMolarSolubility } from '../data';

interface Level1Props {
  onComplete: (score: number) => void;
  onBack: () => void;
}

interface ExpressionOption {
  text: string;
  correct: boolean;
}

function generateKspOptions(compound: IonicCompound): ExpressionOption[] {
  const correct = formatKspExpression(compound);
  const { cation, anion, cationCoeff, anionCoeff } = compound;
  const superscripts: Record<number, string> = { 2: '²', 3: '³', 4: '⁴' };

  // Generate incorrect options
  const wrongOptions: string[] = [];

  // Swapped coefficients
  if (cationCoeff !== anionCoeff) {
    let cat = `[${cation}]`;
    let an = `[${anion}]`;
    if (anionCoeff > 1) cat += superscripts[anionCoeff] || `^${anionCoeff}`;
    if (cationCoeff > 1) an += superscripts[cationCoeff] || `^${cationCoeff}`;
    wrongOptions.push(`Ksp = ${cat}${an}`);
  }

  // Missing exponent
  wrongOptions.push(`Ksp = [${cation}][${anion}]`);

  // Wrong format (multiplied)
  if (anionCoeff > 1) {
    wrongOptions.push(`Ksp = [${cation}] × ${anionCoeff}[${anion}]`);
  }

  // Extra exponent
  if (cationCoeff === 1 && anionCoeff === 1) {
    wrongOptions.push(`Ksp = [${cation}]²[${anion}]²`);
  }

  // Shuffle and select 3 wrong options
  const uniqueWrong = [...new Set(wrongOptions)].filter((o) => o !== correct).slice(0, 3);

  const options: ExpressionOption[] = [
    { text: correct, correct: true },
    ...uniqueWrong.map((text) => ({ text, correct: false })),
  ];

  // Shuffle options
  return options.sort(() => Math.random() - 0.5);
}

export function Level1({ onComplete, onBack }: Level1Props) {
  const { language } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);
  const [hintResetKey, setHintResetKey] = useState(0);

  // For compare_solubility: selected order
  const [selectedOrder, setSelectedOrder] = useState<string[]>([]);

  // Filter challenges to alternate between types
  const writeKspChallenges = level1Challenges.filter((c) => c.type === 'write_ksp');
  const compareChallenges = level1Challenges.filter((c) => c.type === 'compare_solubility');

  // Interleave challenges
  const challenges: Level1Challenge[] = [];
  const maxLen = Math.max(writeKspChallenges.length, compareChallenges.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < writeKspChallenges.length) challenges.push(writeKspChallenges[i]);
    if (i < compareChallenges.length) challenges.push(compareChallenges[i]);
  }

  const currentChallenge = challenges[currentIndex];
  const totalChallenges = Math.min(8, challenges.length);
  const isComplete = currentIndex >= totalChallenges;

  // Generate options for write_ksp
  const [options] = useState<ExpressionOption[]>(() =>
    currentChallenge?.type === 'write_ksp'
      ? generateKspOptions(currentChallenge.compound)
      : []
  );

  const [currentOptions, setCurrentOptions] = useState<ExpressionOption[]>(options);

  // Regenerate options when challenge changes
  const regenerateOptions = useCallback(() => {
    if (challenges[currentIndex]?.type === 'write_ksp') {
      setCurrentOptions(generateKspOptions(challenges[currentIndex].compound));
    }
  }, [currentIndex, challenges]);

  const handleSelectKspExpression = (option: ExpressionOption) => {
    if (showFeedback) return;

    setSelectedAnswer(option.text);
    setShowFeedback(true);
    setIsCorrect(option.correct);

    if (option.correct) {
      setScore((s) => s + (hintLevel === 0 ? 100 : hintLevel === 1 ? 75 : 50));
    }
  };

  const handleSelectCompound = (formula: string) => {
    if (showFeedback) return;

    if (selectedOrder.includes(formula)) {
      setSelectedOrder(selectedOrder.filter((f) => f !== formula));
    } else {
      const newOrder = [...selectedOrder, formula];
      setSelectedOrder(newOrder);

      // Check if all selected
      if (newOrder.length === currentChallenge?.compoundsToCompare?.length) {
        const correct =
          JSON.stringify(newOrder) === JSON.stringify(currentChallenge.correctOrder);
        setShowFeedback(true);
        setIsCorrect(correct);

        if (correct) {
          setScore((s) => s + (hintLevel === 0 ? 100 : hintLevel === 1 ? 75 : 50));
        }
      }
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    setSelectedOrder([]);
    setHintLevel(0);
    setHintResetKey((k) => k + 1);
    setCurrentIndex((i) => i + 1);
    regenerateOptions();
  };

  const handleHintUsed = (_tier: 1 | 2 | 3 | 4, _multiplier: number) => {
    setHintLevel((l) => l + 1);
  };

  if (isComplete) {
    const finalScore = Math.round((score / (totalChallenges * 100)) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">
            {language === 'is' ? 'Þrep 1 lokið!' : 'Level 1 Complete!'}
          </h2>
          <div className="text-6xl mb-6">{finalScore >= 80 ? '🏆' : finalScore >= 60 ? '⭐' : '📚'}</div>
          <p className="text-xl mb-4">
            {language === 'is' ? 'Skor' : 'Score'}: {finalScore}%
          </p>
          <p className="text-gray-600 mb-6">
            {language === 'is'
              ? `Þú svaraðir ${Math.round(score / 100)} af ${totalChallenges} rétt.`
              : `You answered ${Math.round(score / 100)} of ${totalChallenges} correctly.`}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={onBack}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              {language === 'is' ? 'Til baka' : 'Back'}
            </button>
            <button
              onClick={() => onComplete(finalScore)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {language === 'is' ? 'Halda áfram' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            ← {language === 'is' ? 'Til baka' : 'Back'}
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-blue-800">
              {language === 'is' ? 'Þrep 1: Ksp Tjáningar' : 'Level 1: Ksp Expressions'}
            </h1>
            <p className="text-gray-600">
              {currentIndex + 1} / {totalChallenges}
            </p>
          </div>
          <div className="text-right">
            <span className="text-blue-600 font-bold">{score}</span>
            <span className="text-gray-500"> {language === 'is' ? 'stig' : 'pts'}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${(currentIndex / totalChallenges) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {language === 'is' ? currentChallenge.questionIs : currentChallenge.question}
          </h2>

          {/* Compound info */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🧪</div>
              <div>
                <p className="text-2xl font-mono font-bold text-blue-800">
                  {currentChallenge.compound.formula}
                </p>
                <p className="text-gray-600">
                  {language === 'is'
                    ? currentChallenge.compound.nameIs
                    : currentChallenge.compound.name}
                </p>
                {currentChallenge.type === 'write_ksp' && (
                  <p className="text-sm text-gray-500 mt-1">
                    {currentChallenge.compound.formula} ⇌ {currentChallenge.compound.cationCoeff}
                    {currentChallenge.compound.cation} + {currentChallenge.compound.anionCoeff}
                    {currentChallenge.compound.anion}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Write Ksp expression type */}
          {currentChallenge.type === 'write_ksp' && (
            <div className="grid grid-cols-1 gap-3">
              {currentOptions.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectKspExpression(option)}
                  disabled={showFeedback}
                  className={`p-4 rounded-lg border-2 text-left font-mono text-lg transition ${
                    showFeedback
                      ? option.correct
                        ? 'border-green-500 bg-green-50'
                        : selectedAnswer === option.text
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 bg-gray-50'
                      : selectedAnswer === option.text
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  {option.text}
                </button>
              ))}
            </div>
          )}

          {/* Compare solubility type */}
          {currentChallenge.type === 'compare_solubility' && (
            <div>
              <p className="text-sm text-gray-600 mb-4">
                {language === 'is'
                  ? 'Smelltu á efnasamböndin í réttri röð:'
                  : 'Click the compounds in the correct order:'}
              </p>

              {/* Show selected order */}
              {selectedOrder.length > 0 && (
                <div className="flex gap-2 mb-4 p-3 bg-gray-100 rounded-lg">
                  <span className="text-gray-500">
                    {language === 'is' ? 'Röðin þín:' : 'Your order:'}
                  </span>
                  {selectedOrder.map((formula, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-500 text-white rounded">
                      {idx + 1}. {formula}
                    </span>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentChallenge.compoundsToCompare?.map((compound) => {
                  const orderIndex = selectedOrder.indexOf(compound.formula);
                  const isSelected = orderIndex !== -1;

                  return (
                    <button
                      key={compound.formula}
                      onClick={() => handleSelectCompound(compound.formula)}
                      disabled={showFeedback}
                      className={`p-4 rounded-lg border-2 text-center transition relative ${
                        showFeedback
                          ? currentChallenge.correctOrder?.includes(compound.formula)
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200'
                          : isSelected
                            ? 'border-blue-500 bg-blue-100'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute top-2 left-2 w-6 h-6 bg-blue-500 text-white rounded-full text-sm flex items-center justify-center">
                          {orderIndex + 1}
                        </span>
                      )}
                      <p className="text-xl font-mono font-bold">{compound.formula}</p>
                      <p className="text-sm text-gray-600">
                        Ksp = {compound.Ksp.toExponential(2)}
                      </p>
                      <p className="text-xs text-gray-500">
                        s = {calculateMolarSolubility(compound).toExponential(2)} M
                      </p>
                    </button>
                  );
                })}
              </div>

              {showFeedback && (
                <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                  <p className="font-semibold">
                    {language === 'is' ? 'Rétt röð:' : 'Correct order:'}
                  </p>
                  <p className="font-mono">{currentChallenge.correctOrder?.join(' < ')}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div
            className={`rounded-xl p-6 mb-6 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{isCorrect ? '✅' : '❌'}</span>
              <span className="text-xl font-bold">
                {isCorrect
                  ? language === 'is'
                    ? 'Rétt!'
                    : 'Correct!'
                  : language === 'is'
                    ? 'Rangt'
                    : 'Incorrect'}
              </span>
            </div>
            <p className="text-gray-700">
              {language === 'is' ? currentChallenge.explanationIs : currentChallenge.explanation}
            </p>
            <button
              onClick={handleNext}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {language === 'is' ? 'Næst' : 'Next'}
            </button>
          </div>
        )}

        {/* Hint display */}
        {!showFeedback && (
          <HintSystem
            hints={{
              topic:
                language === 'is'
                  ? 'Ksp tjáning sýnir hvernig efnasamband leysist í jónir.'
                  : 'Ksp expression shows how a compound dissolves into ions.',
              strategy:
                language === 'is'
                  ? 'Hugsaðu um upplausnarjöfnuna og fjölda hverrar jónar.'
                  : 'Think about the dissolution equation and the count of each ion.',
              method:
                language === 'is'
                  ? 'Veldi = fjöldi þeirrar jónar í formúlunni.'
                  : 'Exponent = number of that ion in the formula.',
              solution:
                currentChallenge.type === 'write_ksp'
                  ? currentChallenge.correctExpression || ''
                  : currentChallenge.correctOrder?.join(' < ') || '',
            }}
            onHintUsed={handleHintUsed}
            resetKey={hintResetKey}
            disabled={showFeedback}
          />
        )}
      </div>
    </div>
  );
}

export default Level1;
