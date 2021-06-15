package com.issuetracker.web.dto.response;

import com.issuetracker.web.dto.vo.Assignee;
import com.issuetracker.domain.issue.Issue;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class IssueDetailPageResponseDTO {
    private final Long id;
    private final String title;
    private final boolean status;
    private final LocalDateTime createdDateTime;
    private final List<CommentDTO> comments;
    private final List<Assignee> assignees;
    private final List<LabelDTO> labels;
    private final List<MilestoneDTO> milestones;

    public static IssueDetailPageResponseDTO of(Issue issue, List<CommentDTO> comments, List<Assignee> assignees, List<LabelDTO> labels, List<MilestoneDTO> milestones) {
        return IssueDetailPageResponseDTO.builder()
                .id(issue.getId())
                .title(issue.getTitle())
                .status(issue.isOpen())
                .createdDateTime(issue.getCreatedDateTime())
                .comments(comments)
                .assignees(assignees)
                .labels(labels)
                .milestones(milestones)
                .build();
    }
}
