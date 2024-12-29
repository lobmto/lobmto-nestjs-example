export class Tag {
  // NOTE: ORM 固有のエンティティやDTOとドメインモデルを区別するために定義している
  readonly #domainName = 'tag';
  private constructor(
    public readonly id: string,
    public readonly name: string,
  ) {}

  static create(name: string): Tag {
    return new Tag(crypto.randomUUID(), name);
  }

  static reconstruct(id: string, name: string): Tag {
    return new Tag(id, name);
  }

  createUpdated(data: { name?: string }): Tag {
    return new Tag(this.id, data.name ?? this.name);
  }
}
