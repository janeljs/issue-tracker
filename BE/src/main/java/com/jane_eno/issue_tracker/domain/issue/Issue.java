package com.jane_eno.issue_tracker.domain.issue;

import com.jane_eno.issue_tracker.domain.comment.Comment;
import com.jane_eno.issue_tracker.domain.label.Label;
import com.jane_eno.issue_tracker.domain.milestone.Milestone;
import com.jane_eno.issue_tracker.domain.user.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Issue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn
    @ManyToOne
    private User author;

    @ManyToMany
    private List<User> assignees;

    @ManyToMany
    private List<Label> labels;

    @JoinColumn
    @ManyToOne
    private Milestone milestone;

    private boolean isOpen;

    private String title;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @JoinColumn(name = "issue_id", nullable = false)
    private List<Comment> comments;

    private LocalDateTime createdDateTime;

    public Issue create(User author, List<Label> labels, List<User> assignees, Milestone milestone) {
        this.author = author;
        this.labels = labels;
        this.assignees = assignees;
        this.milestone = milestone;
        this.isOpen = true;
        this.createdDateTime = LocalDateTime.now();
        return this;
    }

    public Issue update(String title) {
        this.title = title;
        return this;
    }

    public void updateAssignees(List<User> assignees) {
        this.assignees = assignees;
    }

    public void updateLabels(List<Label> labels) {
        this.labels = labels;
    }

    public void updateMilestone(Milestone milestone) {
        this.milestone = milestone;
    }

    public String getMilestoneTitle() {
        return milestone.getTitle();
    }

    public Issue addComment(Comment comment) {
        comments.add(comment);
        return this;
    }

    public void deleteComment(Comment comment) {
        if (!comment.equals(this.comments.get(0))) {
            this.comments.remove(comment);
        }
    }

    public String getFirstComment() {
        return comments.get(0).getComment();
    }

    public int getCommentNumber() {
        return comments.size();
    }

    public boolean checkAssignees(User user) {
        long count = assignees.stream()
                .filter(assignee -> assignee.matchUser(user))
                .count();
        return count > 0;
    }

    public boolean checkLabels(Label targetLabel) {
        long count = labels.stream()
                .filter(label -> label.matchLabel(targetLabel))
                .count();
        return count > 0;
    }
}
