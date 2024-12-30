import { BadRequestException } from '@nestjs/common';

export class Word {
  // NOTE: ORM 固有のエンティティやDTOとドメインモデルを区別するために定義している
  readonly #domainName = 'Word';
  public readonly tagIdList: string[];

  private constructor(
    public readonly id: string,
    public readonly word: string,
    public readonly meaning: string,
    tagIdList: string[],
  ) {
    // TODO: Domain 層のエラー定義
    if (new Set(tagIdList).size !== tagIdList.length) {
      throw new BadRequestException('タグIDが重複しています');
    }
    if (tagIdList.length > 5) {
      throw new BadRequestException('タグは5個までしか設定できません');
    }
    this.tagIdList = tagIdList;
  }

  public static create(
    word: string,
    meaning: string,
    tagIdList: string[],
  ): Word {
    return new Word(crypto.randomUUID(), word, meaning, tagIdList);
  }

  public static reconstruct(
    id: string,
    word: string,
    meaning: string,
    tagIdList: string[],
  ): Word {
    return new Word(id, word, meaning, tagIdList);
  }

  public createUpdated(data: {
    word?: string;
    meaning?: string;
    tagIdList?: string[];
  }): Word {
    return new Word(
      this.id,
      data.word ?? this.word,
      data.meaning ?? this.meaning,
      data.tagIdList ?? this.tagIdList,
    );
  }
}
