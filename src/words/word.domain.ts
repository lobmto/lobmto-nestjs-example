export class Word {
  // NOTE: ORM 固有のエンティティやDTOとドメインモデルを区別するために定義している
  readonly #domainName = 'Word';

  private constructor(
    public readonly id: string,
    public readonly word: string,
    public readonly meaning: string,
  ) {}

  public static create(word: string, meaning: string): Word {
    return new Word(crypto.randomUUID(), word, meaning);
  }

  public static reconstruct(id: string, word: string, meaning: string): Word {
    return new Word(id, word, meaning);
  }

  public createUpdated(data: { word?: string; meaning?: string }): Word {
    return new Word(
      this.id,
      data.word ?? this.word,
      data.meaning ?? this.meaning,
    );
  }
}
